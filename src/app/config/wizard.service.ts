import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { CommonStepBase } from './steps/common-step.base';
import { LiEvents } from '../core/li-events';

@Injectable()
export class WizardService extends LiEvents {

    public static readonly IS_NEXT = 'next';
    public static readonly GO_NEXT = 'go_next';
    public static readonly END_WIZARD = 'end_wizard';

    public static readonly STEP_LOADED = 'step_loaded';


    private basePath;
    private index = 0;
    private steps: Routes = [];

    constructor(private router: Router) {
        super();

        this.basePath = router.config[router.config.length - 1].path;
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

        for (let i = 0; i < this.steps.length; i++) {
            if (!(this.steps[i].data && this.steps[i].data.abstractStep)) {
                progressStep++;
            }

            if (this.steps[i].component === stepComponent.constructor) {
                this.index = i;
                break;
            }
        }

        this.notifySubscribers(WizardService.STEP_LOADED, {
            title: stepComponent.title,
            progressStep: progressStep,
            showProgress: stepComponent.showProgress,
        });
    }

    getNavigationControls() {
        return {
            next: {
                isVisible: this.hasNextStep.bind(this),
                action: () => {
                    this.notifySubscribers(WizardService.GO_NEXT);
                },
            },
            end: {
                isVisible: this.isEndStep.bind(this),
                action: () => {
                    this.notifySubscribers(WizardService.END_WIZARD);
                },
            }
        };
    }

    goNextStep() {
        if (this.hasNextStep()) {
            this.router.navigate(
                [this.basePath + '/' + this.steps[this.index + 1].path],
            );
        }
    }

    resetWizard() {
        this.router.navigate([this.basePath]);
    }

    private hasNextStep() {
        return !!this.steps[this.index + 1];
    }

    private isEndStep() {
        return this.index + 1 >= this.steps.length;
    }

}
