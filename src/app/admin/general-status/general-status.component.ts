import { Component } from '@angular/core';
import { ApiClientService } from '../../core/api-client.service';

@Component({
    templateUrl: './general-status.component.html',
    styleUrls: ['./general-status.component.scss']
})
export class GeneralStatusComponent {
    currentConfig: any[] = [];

    constructor(protected apiService: ApiClientService) {
        this.refreshStatus();
    }

    refreshStatus() {
        this.currentConfig = [];

        this.apiService.get('/api/network/status/')
            .subscribe((response: any) => {
                if (response.interfaces) {
                    for (let i = 0; i < response.interfaces.length; i++) {
                        this.currentConfig.push(
                            {
                                title: 'Interface #' + i,
                                fields: this.mapStatus(response.interfaces[i])
                            }
                        );
                    }
                }
            });
    }

    mapStatus(response) {
        const mapping = {
            'name': {
                label: 'Name',
            },
            'label': {
                label: 'Label',
            },
            'ip_address': {
                label: 'IP'
            },
            'ssid': {
                label: 'SSID'
            },
            'error_message': {
                label: 'Error message',
                valueClass: 'text-danger'
            }
        };

        let out = [];
        for (let prop in response) {
            if (response.hasOwnProperty(prop) && mapping[prop] && response[prop] !== null) {
                let iconClass = '';
                let itemValue = response[prop];
                let displayValue = response[prop];

                switch (typeof itemValue) {
                    case 'boolean':
                        iconClass = response[prop] ? 'fa fa-check text-success' : 'fa fa-times text-danger';
                        displayValue = '';
                        break;
                }

                let item = Object.create(mapping[prop]);
                item.value = itemValue;
                item.displayValue = displayValue;
                item.iconClass = iconClass;

                out.push(item);
            }
        }

        return out;
    }
}
