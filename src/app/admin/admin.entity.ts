import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiClientService } from '../core/api-client.service';
import { LiEvents } from '../core/li-events';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import { DynamicFormControl } from '../shared/dynamic-forms/builder/dynamic-form-control';
import { LiNotificationsService } from '../core/li-notifications.service';
import { LiNotification } from '../core/li-notification';

declare let $: any;

@Injectable()
export class AdminEntity extends LiEvents {

    public static readonly API_CONFIG_LOADED = 'admin_config_loaded';
    public static readonly API_UPDATE_NETWORK = 'admin_update_network';
    public static readonly API_UPDATE_SERVICE = 'admin_update_service';

    public userConfig: {} = null;

    private configState: {} = null;

    updatingNotification: any;

    constructor(
        protected apiService: ApiClientService,
        protected notificationsService: LiNotificationsService
    ) {
        super();


        apiService.subscribe(ApiClientService.EV_BEFORE_PUT, () => {
            this.updatingNotification =
                this.notificationsService.show('Updating your settings', LiNotification.TYPE_INFO);
        });

        apiService.subscribe(ApiClientService.EV_PUT_SUCCESSFUL, () => {
            this.updatingNotification.close();
            this.notificationsService.show('Your settings have been updated', LiNotification.TYPE_SUCCESS);
        });

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

        this.subscribe(AdminEntity.API_UPDATE_SERVICE, (control: DynamicFormControl) => {

            this.updateService(control)
                .subscribe(null, null, () => {
                    console.log('Succesfully updated settings');
                });
        });
    }

    updateConfigState(newConfig: {}) {
        this.userConfig = $.extend(true, this.userConfig, newConfig);
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

    public requestUserDetails() {
        return this.apiService
            .get('/api/users')
            .map(res => res.json());
    }

    public requestDiscoveredNodes() {
        return this.apiService
            .get('/discovery/nodes')
            .map(res => res.json());
    }

    private updateNetworkDetails(networkDetails: {}) {
        return this.apiService
            .put('/network/config', networkDetails);
    }

    private updateService(control: DynamicFormControl) {
        return this.apiService
            .put('/services/' + control.id, { enabled: !!control.value });
    }

    public updateNode(control: DynamicFormControl) {
        return this.apiService
            .put('/discovery/nodes/' + control.id, { enabled: !!control.value });
    }
}
