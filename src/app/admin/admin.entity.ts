import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiClientService } from '../core/api-client.service';
import { LiEvents } from '../core/li-events';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';

declare let $: any;

@Injectable()
export class AdminEntity extends LiEvents {

    public static readonly API_CONFIG_LOADED = 'admin_config_loaded';
    public static readonly API_UPDATE_NETWORK = 'admin_update_network';
    public static readonly API_UPDATE_SERVICES = 'admin_update_services';

    public userConfig: {} = null;

    public configState: {} = null;

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

                this.userConfig = Object.create(this.configState);

                this.notifySubscribers(AdminEntity.API_CONFIG_LOADED, this.configState);
            });

        this.subscribe(AdminEntity.API_UPDATE_NETWORK, () => {

            let networkConfig = { network: this.userConfig['network'] };

            this.updateNetworkDetails(networkConfig)
                .subscribe(null, null, () => {
                    console.log('Succesfully updated settings');
                });
        });

        this.subscribe(AdminEntity.API_UPDATE_SERVICES, () => {

            let servicesConfig = this.userConfig['services'];

            this.updateServices(servicesConfig)
                .subscribe(null, null, () => {
                    console.log('Succesfully updated settings');
                });
        });
    }

    updateConfigState(newConfig: {}) {
        this.userConfig = $.extend(true, this.userConfig, newConfig);
        // console.clear();
        // console.log(this.userConfig);
    }

    getConfigState() {
        return this.configState;
    }

    private requestNetworkDetails() {
        return this.apiService
            .get('/network/config')
            .map(res => res.json());
    }

    private requestServicesDetails() {
        return this.apiService
            .get('/services')
            .map(res => res.json());
    }

    private updateNetworkDetails(networkDetails: {}) {
        return this.apiService
            .put('/network/config', networkDetails);
    }

    private updateAdminDetails(adminConfig: {}) {
        return this.apiService
            .post('/setup/registration', adminConfig);
    }

    private updateServices(services: {}) {
        let requests = [];

        for (let i in services) {
            requests.push(
                this.apiService
                    .put('/services/' + i, {enabled: services[i]})
            );
        }

        return Observable.forkJoin(requests);
    }
}
