import { Component } from '@angular/core';
import { DynamicFormControl } from '../../shared/dynamic-forms/builder/dynamic-form-control';
import { DynamicFormGroup } from '../../shared/dynamic-forms/builder/dynamic-form-group';
import { ApiClientService } from '../../core/api-client.service';

@Component({
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.scss']
})
export class NodesComponent {

    tableColumns = [
        {
            name: 'hostname',
            label: 'Node name'
        },
        {
            name: 'discovery_interface',
            label: 'Discovery Interface'
        },
        {
            name: 'last_seen_at',
            label: 'Last Seen'
        },
        {
            name: 'address',
            label: 'IP Address'
        }
    ];

    nodes = [];

    fg: DynamicFormGroup = new DynamicFormGroup();

    constructor(private apiService: ApiClientService) {
        apiService
            .get('/api/nodes')
            .map(res => res.json())
            .subscribe((data) => {
                for (let node of data) {

                    Object.assign(node, node.data);

                    let control = new DynamicFormControl(node.hostname)
                        .setControlType(DynamicFormControl.TYPE_SLIDER)
                        .setValue(node.is_trusted, {emitEvent: false})
                        .onChange((value, self: DynamicFormControl) => {
                            this.updateNode(self);
                        });

                    this.fg.addControl(node.hostname, control);

                    node['control'] = control;

                    this.nodes.push(node);
                }

            });
    }

    updateNode(control: DynamicFormControl) {
        return this.apiService
            .put('/api/discovery/nodes/' + control.id + '/trusted', { trusted: !!control.value });
    }

}
