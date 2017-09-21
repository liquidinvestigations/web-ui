import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CommonStepBase } from './steps/common-step.base';
import { LiEvents } from '../core/li-events';

@Injectable()
export class WizardService extends LiEvents {

    public static readonly IS_NEXT = 'next';
    public static readonly IS_PREV = 'prev';

    public static readonly STEP_LOADED = 'step_loaded';

    public direction = WizardService.IS_NEXT;

    public controlsObservable: Observable<any>;
    private controlsObserver: any;

    private basePath;
    private index = 0;
    private steps: Routes = [];

    constructor(private router: Router) {
        super();

        this.basePath = router.config[router.config.length - 1].path;

        this.controlsObservable = new Observable(
            (observer: any) => {
                this.controlsObserver = observer;
            }
        );
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
                    [this.basePath + '/' + this.steps[this.index + 1].path],
                );
            });
        }
    }

    goPreviousStep() {
        this.direction = WizardService.IS_PREV;

        if (this.hasPreviousStep()) {
            setTimeout(() => {
                this.router.navigate(
                    [this.basePath + '/' + this.steps[this.index - 1].path],
                );
            });
        }
    }

    resetWizard() {
        this.router.navigate(
            [this.basePath],
        );
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
