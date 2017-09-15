import { Injectable } from '@angular/core';
import { ApiClientService } from '../core/api-client.service';
import { Entity } from '../shared/entity/entity';
import { Events } from '../core/events';
import { DynamicFormControlModel } from '@ng-dynamic-forms/core/src/model/dynamic-form-control.model';

declare let $: any;

@Injectable()
export class WizardEntity extends Entity {
    public static readonly GET_CONFIG = 'get_config';

    public userConfig: {} = {};

    private configState = null;

    public eventHandler: Events = new Events();

    endpoint = '/network/config';

    constructor(protected apiService: ApiClientService) {
        super();
    }

    getRouterConfig() {
        // calling Get /network/config
        this.apiService.get(this);

        // store data and call subscribers
        this.apiService.subscribe(ApiClientService.EV_GET_SUCCESSFUL, (data: any) => {
            this.configState = data;
            this.eventHandler.notifySubscribers(WizardEntity.GET_CONFIG, data);
        });
    }

    updateFormData(mappingCallback: Function) {
        if (this.configState) {
            setTimeout(() => {
                mappingCallback(this.configState);
            });
        } else {
            this.eventHandler.subscribe(WizardEntity.GET_CONFIG, (data: any) => {
                mappingCallback(this.configState);
            });
        }
    }

    adjustConfig(newConfig: {}) {

        this.userConfig = $.extend(true, this.userConfig, newConfig);
        console.clear();
        console.log(JSON.stringify(this.userConfig, null, 2));
    }

    getFields(): DynamicFormControlModel[] { return []; }

    submitAction(): void { }


    updateConfiguration() {
        this.apiService.put(this, this.userConfig);

        this.apiService.subscribe(ApiClientService.EV_PUT_SUCCESSFUL, (data: any) => {
            console.log('Successfully updated using:', JSON.stringify(this.userConfig, null, 2));
        });
    }
}
