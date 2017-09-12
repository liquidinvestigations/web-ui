import { Component, Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { StepInterface } from './steps/step.interface';

@Injectable()
export class WizardService {

    public static readonly IS_NEXT = 'next';
    public static readonly IS_PREV = 'prev';

    private basePath;
    private direction = WizardService.IS_NEXT;
    private index = 0;
    private steps: Routes = [];

    private stepManager: Function = () => {};
    private titleManager: Function = () => {};

    constructor(
        private router: Router,
    ) {
        this.basePath = router.config[router.config.length - 1].path;
    }

    initSteps(routes: Routes) {
        for (let route of routes) {
            if (route.path) {
                this.steps.push(route);
            }
        }

        return this.steps.length;
    }

    manageStep(stepManager: Function) {
        this.stepManager = stepManager;
    }

    manageTitle(titleManager: Function) {
        this.titleManager = titleManager;
    }

    setStep(component: StepInterface) {
        for (let i = 0; i < this.steps.length; i++) {
            if (this.steps[i].component === component.constructor) {
                this.index = i;

                this.stepManager(i);
                this.titleManager(component.title);
                break;
            }
        }
    }

    getControls() {
        return {
            next: {
                isVisible: this.hasNextStep.bind(this),
                action: this.goNextStep.bind(this),
            },
            previous: {
                isVisible: this.hasPreviousStep.bind(this),
                action: this.goPreviousStep.bind(this),
            }
        };
    }

    isNext() {
        return this.direction === WizardService.IS_NEXT;
    }

    isPrev() {
        return this.direction === WizardService.IS_PREV;
    }

    private hasNextStep() {
        return !!this.steps[this.index + 1];
    }

    private hasPreviousStep() {
        return !!this.steps[this.index - 1];
    }

    private goNextStep() {
        this.direction = WizardService.IS_NEXT;

        if (this.hasNextStep()) {
            setTimeout(() => {
                this.router.navigate(
                    [ this.basePath + '/' + this.steps[this.index + 1].path ],
                );
            });
        }
    }

    private goPreviousStep() {
        this.direction = WizardService.IS_PREV;

        if (this.hasPreviousStep()) {
            setTimeout(() => {
                this.router.navigate(
                    [ this.basePath + '/' + this.steps[this.index - 1].path ],
                );
            });
        }
    }

}
