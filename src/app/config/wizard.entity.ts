import { Injectable } from '@angular/core';
import { ApiClientService } from '../core/api-client.service';
import { LiEvents } from '../core/li-events';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';

declare let $: any;

@Injectable()
export class WizardEntity extends LiEvents {

    public static readonly CONFIG_LOADED = 'config_loaded';

    public userConfig: {} = {};

    private configState = null;

    constructor(protected apiService: ApiClientService) {
        super();

        Observable
            .forkJoin([this.requestNetworkDetails(), this.requestServicesDetails()])
            .subscribe((response) => {

                let services = {};

                for (let service of response[1]) {
                    services[service.name] = service.status === 'enabled';
                }

                this.configState = {
                    network: response[0]['network'],
                    services: services,
                };

                console.log(this.configState);

                this.notifySubscribers(WizardEntity.CONFIG_LOADED, this.configState);
            });
    }

    adjustConfig(newConfig: {}) {
        this.userConfig = $.extend(true, this.userConfig, newConfig);
        console.clear();
        console.log(JSON.stringify(this.userConfig, null, 2));
    }

    getConfigState() {
        return this.configState;
    }

    requestNetworkDetails() {
        return this.apiService
            .get('/network/config')
            .map(res => res.json());
    }

    requestServicesDetails() {
        return this.apiService
            .get('/services')
            .map(res => res.json());
    }

    updateNetworkDetails(networkDetails: {}) {
        console.log('network details', networkDetails);
    }

    updateAdminDetails(adminConfig: {}) {
        console.log('Setting Admin details', adminConfig);
    }

    updateServices(services: {}) {
        console.log('Setting services', services);
    }

}
