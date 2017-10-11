import { Injectable } from '@angular/core';
import { ApiClientService } from '../core/api-client.service';
import { LiEvents } from '../core/li-events';

declare let $: any;

@Injectable()
export class WizardStateService extends LiEvents {

    public static readonly GETTING_DEVICE_CONFIG = 'getting_device_config';
    public static readonly DEVICE_CONFIG_LOADED = 'loaded_device_config';

    private userConfig: {} = null;

    constructor(private apiService: ApiClientService) {
        super();
    }

    init() {

        this.apiService.get([
            '/api/registration/',
            '/api/services/'
        ])
            .subscribe((response) => {
                let filteredServices = {};

                for (let service of response[1]) {
                    filteredServices[service.name] = service.is_enabled;
                }

                this.userConfig = response[0];
                this.userConfig['services'] = filteredServices;

                this.notifySubscribers(WizardStateService.DEVICE_CONFIG_LOADED, this.userConfig);
            });
    }

    updateConfigState(newConfig: {}) {
        this.userConfig = $.extend(true, this.userConfig, newConfig);
    }

    getConfigState() {
        return this.userConfig;
    }

}
