import { Component } from '@angular/core';
import { CommonStepBase } from '../common-step.base';
import { WizardService } from '../../wizard.service';
import { mapSummaryConfig } from '../../../shared/li-forms/summary-mapping';
import { WizardStateService } from '../../wizard-state.service';
import { ApiClientService } from '../../../core/api-client.service';
import { ProgressiveRequest, ProgressiveRequests } from '../../../core/progressive-requests';

@Component({
    selector: 'li-summary-step',
    templateUrl: './summary-step.component.html',
    styleUrls: ['./summary-step.component.scss']
})
export class SummaryStepComponent extends CommonStepBase {
    title = 'Summary';

    buttonConfig = {
        label: 'Install',
        iconClass: 'fa fa-cogs',
        buttonClass: 'btn btn-primary',
        action: () => {
            this.wizardService.notifySubscribers(WizardService.END_WIZARD);
        },
        isDisabled: () => this.buttonDisabled,
        isLoading: () => this.isLoading,
    };

    currentConfig: {};

    constructor(private apiService: ApiClientService,
                protected wizardService: WizardService,
                public wizardConfigStateEntity: WizardStateService) {
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

        let requests = this.updateServices(services);

        requests.push({
            request: this.apiService.post('/api/registration/', config),
            message: 'Configuring device'
        });

        this.wizardService.notifySubscribers(WizardService.TOGGLE_API_BAR, true);

        let progressiveCalls = new ProgressiveRequests(requests);

        progressiveCalls.subscribe(ProgressiveRequests.API_PROGRESS_BAR_INCREMENT, (data) => {
            this.wizardService.notifySubscribers(WizardService.API_BAR_PROGRESS, data);
        });

        progressiveCalls.subscribe(ProgressiveRequests.API_PROGRESS_BAR_END, (data) => {

            setTimeout(() => {
                this.wizardService.notifySubscribers(WizardService.API_BAR_PROGRESS, data);

                setTimeout(() => {
                    this.wizardService.notifySubscribers(WizardService.TOGGLE_API_BAR, false);
                    this.wizardService.notifySubscribers(WizardService.GO_NEXT);
                }, 700);
            }, 500);
        });
    }

    updateServices(services) {
        let requests: ProgressiveRequest[] = [];

        for (let name in services) {
            requests.push({
                request: this.apiService.put('/api/services/' + name + '/enabled/', {is_enabled: services[name] === true}),
                message: 'Configuring ' + name
            });
        }

        return requests;
    }

    switchToText(field) {
        field.showAsText = !field.showAsText;
    }

    isPasswordText(field) {
        return field.label.toLowerCase() === 'password';
    }

    showAsBullets(label) {
        return label.replace(/./g, '*');
    }
}
