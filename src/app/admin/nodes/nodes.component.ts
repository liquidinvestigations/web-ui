import { Component, OnInit } from '@angular/core';
import { AdminEntity } from '../admin.entity';
import { DynamicFormControl } from '../../shared/dynamic-forms/builder/dynamic-form-control';
import { DynamicFormGroup } from '../../shared/dynamic-forms/builder/dynamic-form-group';

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

    constructor(private adminEntity: AdminEntity) {
        adminEntity.requestDiscoveredNodes()
            .subscribe((data) => {
                for (let node of data) {

                    let control = new DynamicFormControl(node.name)
                        .setControlType(DynamicFormControl.TYPE_SLIDER)
                        .onChange((value, self: DynamicFormControl) => {
                            this.adminEntity.updateNode(self);
                        });

                    this.fg.addControl(node.name, control);

                    node['control'] = control;

                    this.nodes.push(node);
                }

            });

    }

    getControl(node: {}) {

        return ;
    }

}
