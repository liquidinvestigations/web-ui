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
    public static readonly UPDATE_CONFIG = 'update_config';

    public userConfig: {} = null;

    private configState: {} = null;

    constructor(protected apiService: ApiClientService) {
        super();

        this.configState = {
            "network": {
                "domain": "liquidnode.liquid",
                "lan": {
                    "eth": false,
                    "ip": "10.0.0.1",
                    "netmask": "255.255.255.0",
                    "dhcp_range": "10.0.0.100-255",
                    "hotspot": {
                        "ssid": "foo",
                        "password": "bar"
                    }
                },
                "wan": {
                    "static": {
                        "ip": "192.168.66.66",
                        "netmask": "255.255.255.0",
                        "gateway": "192.168.66.1",
                        "dns_server": "192.168.66.1"
                    },
                    "wifi": {
                        "ssid": "network",
                        "password": "password"
                    }
                },
                "ssh": {
                    "enabled": true,
                    "authorized_keys": [
                        {key: "key 1"},
                        {key: "key 2"},
                        {key: "key 3"},
                    ]
                }
            },
            "admin": {
                "username": "test_admin",
                "password": "qwe123",
                "confirm_password": "qwe123"
            },
            "services": {
                "hoover": false,
                "hypothesis": true,
                "docuwiki": "",
                "matrix": "",
                "davros": true
            }
        };
        this.userConfig = this.configState;

        this.notifySubscribers(WizardEntity.CONFIG_LOADED, this.configState);


        // Observable
        //     .forkJoin([this.requestNetworkDetails(), this.requestServicesDetails()])
        //     .subscribe((response) => {
        //
        //         let services = {};
        //
        //         for (let service of response[1]) {
        //             services[service.name] = service.status === 'enabled';
        //         }
        //
        //         this.configState = {
        //             network: response[0]['network'],
        //             services: services,
        //         };
        //
        //         this.notifySubscribers(WizardEntity.CONFIG_LOADED, this.configState);
        //     });

        this.subscribe(WizardEntity.UPDATE_CONFIG, () => {

            let networkConfig = { network: this.userConfig['network'] };

            let adminConfig = this.userConfig['admin'];
            delete adminConfig['confirm_password'];
            adminConfig['domain'] = this.userConfig['network'].domain;

            let servicesConfig = this.userConfig['services'];


            Observable.forkJoin([
                this.updateNetworkDetails(networkConfig),
                this.updateAdminDetails(adminConfig),
                this.updateServices(servicesConfig)
            ])
                .subscribe(null, null, () => {
                    console.log('Succesfully updated settings');
                });
        });
    }

    updateConfigState(newConfig: {}) {
        this.userConfig = $.extend(true, this.userConfig, newConfig);
        console.clear();
        console.log(this.userConfig);
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
                    .put('/services/' + i, { enabled: services[i] })
            );
        }

        return Observable.forkJoin(requests);
    }

}
