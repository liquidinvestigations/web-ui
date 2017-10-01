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
            name: 'name',
            label: 'Node name'
        },
        {
            name: 'discovery_interface',
            label: 'Discovery Interface'
        },
        {
            name: 'last_seen',
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
            .get('/api/discovery/nodes')
            .map(res => res.json())
            .subscribe((data) => {
                for (let node of data) {

                    let control = new DynamicFormControl(node.name)
                        .setControlType(DynamicFormControl.TYPE_SLIDER)
                        .onChange((value, self: DynamicFormControl) => {
                            this.updateNode(self);
                        });

                    this.fg.addControl(node.name, control);

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
