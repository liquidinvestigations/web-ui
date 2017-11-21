import { Component } from '@angular/core';
import { ApiClientService } from '../../../core/api-client.service';

@Component({
    templateUrl: './vpn-status.component.html',
    styleUrls: ['./vpn-status.component.scss']
})
export class VpnStatusComponent {
    currentConfig: any[] = [];

    constructor(protected apiService: ApiClientService) {
        this.refreshStatus();
    }

    refreshStatus() {
        this.apiService.get(
            '/api/vpn/'
        )
            .subscribe((response: any) => {

                this.currentConfig = [
                    {
                        title: 'Server configuration',
                        fields: this.mapVpnResponse(response['server']),
                        key: 'server'
                    },
                    {
                        title: 'Client configuration',
                        fields: this.mapVpnResponse(response['client']),
                        key: 'client'
                    },
                ];

            });
    }

    mapVpnResponse(response) {
        const mapping = {
            'state_description': {
                label: 'Current state',
            },
            'is_enabled': {
                label: 'Enabled',
            },
            'is_running': {
                label: 'Running'
            },
            'registered_key_count': {
                label: 'Registered keys'
            },
            'active_connection_count': {
                label: 'Connection count'
            },
            'error_message': {
                label: 'Error message'
            }
        };

        let out = [];
        for (let prop in response) {
            if (response.hasOwnProperty(prop) && mapping[prop] && response[prop] !== null) {
                let iconClass = '';
                let cssClass = '';
                let itemValue = response[prop];
                let displayValue = response[prop];

                switch (typeof itemValue) {
                    case 'boolean':
                        cssClass = response[prop] ? 'text-success' : 'text-danger';
                        displayValue = response[prop] ? 'yes' : 'no';
                        break;
                }

                let item = Object.create(mapping[prop]);
                item.value = itemValue;
                item.displayValue = displayValue;
                item.iconClass = iconClass;
                item.cssClass = cssClass;

                out.push(item);
            }
        }

        return out;
    }

}
