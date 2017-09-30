import { Injectable } from '@angular/core';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';

declare let $: any;

@Injectable()
export class WizardConfigStateEntity {

    // we should trigger the device restart
    public static readonly RESTART_DEVICE = 'restart_device';

    private userConfig: {} = null;

    updateConfigState(newConfig: {}) {
        this.userConfig = $.extend(true, this.userConfig, newConfig);
    }

    getConfigState() {
        return this.userConfig;
    }

}
