import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CommonStepBase } from './steps/common-step.base';

@Injectable()
export class WizardService {

    public static readonly IS_NEXT = 'next';
    public static readonly IS_PREV = 'prev';

    public direction = WizardService.IS_NEXT;

    public controlsObservable: Observable<any>;
    private controlsObserver: any;

    private basePath;
    private index = -1;
    private steps: Routes = [];

    private stepManager: Function = () => {};
    private titleManager: Function = () => {};
    private progressVisibilityManager: Function = () => {};


    constructor(
        private router: Router,
    ) {
        this.basePath = router.config[router.config.length - 1].path;

        this.controlsObservable = new Observable(
            (observer: any) => { this.controlsObserver = observer; }
        );
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

    manageProgressVisibility(progressVisibilityManager: Function) {
        this.progressVisibilityManager = progressVisibilityManager;
    }

    setStep(stepComponent: CommonStepBase) {
        for (let i = 0; i < this.steps.length; i++) {
            if (this.steps[i].component === stepComponent.constructor) {
                this.index = i;
                this.stepManager(i);
                break;
            }
        }

        this.titleManager(stepComponent.title);
        this.progressVisibilityManager(stepComponent.showProgress);
    }

    getControls() {
        return {
            next: {
                isVisible: this.hasNextStep.bind(this),
                action: () => {
                    this.controlsObserver.next(WizardService.IS_NEXT);
                },
            },
            previous: {
                isVisible: this.hasPreviousStep.bind(this),
                action: () => {
                    this.controlsObserver.next(WizardService.IS_PREV);
                },
            },
            end: {
                isVisible: this.isEndStep.bind(this),
                action: () => {
                    this.controlsObserver.complete();
                },
            }
        };
    }

    goNextStep() {
        this.direction = WizardService.IS_NEXT;

        if (this.hasNextStep()) {
            setTimeout(() => {
                this.router.navigate(
                    [ this.basePath + '/' + this.steps[this.index + 1].path ],
                );
            });
        }
    }

    goPreviousStep() {
        this.direction = WizardService.IS_PREV;

        if (this.hasPreviousStep()) {
            setTimeout(() => {
                this.router.navigate(
                    [ this.basePath + '/' + this.steps[this.index - 1].path ],
                );
            });
        }
    }

    resetWizard() {
        setTimeout(() => {
            this.router.navigate(
                [ this.basePath ],
            );
        });
    }

    private hasNextStep() {
        return !!this.steps[this.index + 1];
    }

    private hasPreviousStep() {
        return !!this.steps[this.index - 1];
    }

    private isEndStep() {
        return this.index + 1 >= this.steps.length;
    }

}
