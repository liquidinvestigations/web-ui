import { Component } from '@angular/core';
import { CommonStepBase } from '../common-step.base';
import { WizardService } from '../../wizard.service';
import { mapSummaryConfig } from '../../../shared/li-forms/summary-mapping';
import { WizardStateService } from '../../wizard-state.service';
import { ApiClientService } from '../../../core/api-client.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'li-summary-step',
    templateUrl: './summary-step.component.html',
    styleUrls: ['./summary-step.component.scss']
})
export class SummaryStepComponent extends CommonStepBase {
    title = 'Summary';

    buttonConfig = {
        label: 'Install',
        iconClass: '',
        buttonClass: 'btn btn-primary',
        action: () => {
            this.wizardService.notifySubscribers(WizardService.END_WIZARD);
        },
        isDisabled: () => this.buttonDisabled,
        isLoading: () => this.isLoading,
    };

    currentConfig: {};

    constructor(
        private apiService: ApiClientService,
        protected wizardService: WizardService,
        public wizardConfigStateEntity: WizardStateService
    ) {
        super(wizardService);
    }

    ngOnInit() {
        super.ngOnInit();

        this.currentConfig = mapSummaryConfig(
            this.wizardConfigStateEntity.getConfigState()
        );
    }

    onFinish() {
        // we should trigger the device restart

        let config = this.wizardConfigStateEntity.getConfigState();
        delete config['confirm_password'];

        let useDHCP = config['wan'].dhcp;

        if (useDHCP) {
            config['wan'].static = null;
        }

        delete config['wan'].dhcp;

        let services = config['services'];
        delete config['services'];

        // update services

        this.buttonDisabled = true;
        this.isLoading = true;

        this.updateServices(services).
            subscribe(() => {
                this.apiService.post('/api/registration/', config)
                    .subscribe(() => {});

            this.wizardService.notifySubscribers(WizardService.GO_NEXT);
        });
    }

    updateServices(services) {

        let requests = [];

        for (let i in services) {
            requests.push(
                this.apiService
                    .put('/api/services/' + i + '/enabled/', {enabled: services[i] === true})
            );
        }

        return Observable.forkJoin(requests);
    }


}
