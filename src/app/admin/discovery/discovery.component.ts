import { Component } from '@angular/core';
import { ApiClientService } from '../../core/api-client.service';

@Component({
  templateUrl: './discovery.component.html',
  styleUrls: ['./discovery.component.scss']
})
export class DiscoveryComponent {

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

    nodes = [
        {
            title: 'Trusted nodes',
            entries: []
        },
        {
            title: 'Untrusted nodes',
            entries: []
        }
    ];

    constructor(private apiService: ApiClientService) {
        this.getNodes();
    }

    getNodes() {
        this.nodes[0].entries = [];
        this.nodes[1].entries = [];

        this.apiService
            .get('/api/nodes/')
            .subscribe((data) => {
                for (let node of data) {
                    Object.assign(node, node.data);

                    if (node.is_trusted) {
                        this.nodes[0].entries.push(node);
                    } else {
                        this.nodes[1].entries.push(node);
                    }
                }
            });
    }

    updateNode(id, value) {
        return this.apiService
            .put('/api/nodes/' + id + '/trusted/', { is_trusted: value })
            .subscribe(() => {
                this.getNodes();
            });
    }

}
