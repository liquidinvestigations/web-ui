import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { CommonStepBase } from './steps/common-step.base';
import { LiEvents } from '../core/li-events';

@Injectable()
export class WizardService extends LiEvents {

    public static readonly GO_NEXT = 'go_next';
    public static readonly END_WIZARD = 'end_wizard';

    public static readonly STEP_LOADED = 'step_loaded';

    private basePath;
    private stepIndex = 0;
    private steps: Routes = [];

    constructor(private router: Router) {
        super();
        this.basePath = 'config';
    }

    initSteps(routes: Routes) {
        this.steps = routes;
    }

    getProgressStepsLength() {
        return this.steps
            .filter((route) => !(route.data && route.data.abstractStep))
            .length;
    }

    setStep(stepComponent: CommonStepBase) {
        let progressStep = -1;
        let buttonConfig = {};

        for (let i = 0; i < this.steps.length; i++) {
            if (!(this.steps[i].data && this.steps[i].data.abstractStep)) {
                progressStep++;
            }

            if (this.steps[i].component === stepComponent.constructor) {
                this.stepIndex = i;
                buttonConfig = stepComponent.buttonConfig;
                break;
            }
        }

        this.notifySubscribers(WizardService.STEP_LOADED, {
            title: stepComponent.title,
            progressStep: progressStep,
            showProgress: stepComponent.showProgress,
            buttonConfig: buttonConfig
        });
    }

    goNextStep() {
        if (this.hasNextStep()) {
            this.router.navigate(
                [this.basePath + '/' + this.steps[this.stepIndex + 1].path],
                {skipLocationChange: true, replaceUrl: true}
            );
        }
    }

    resetWizard() {
        this.router.navigate([this.basePath]);
    }

    private hasNextStep() {
        return !!this.steps[this.stepIndex + 1];
    }

}
