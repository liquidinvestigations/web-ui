import { Component, ElementRef, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WizardService } from './wizard.service';
import { slideLeft } from './wizard-routing.animation';
import { WizardStateService } from './wizard-state.service';

declare let $: any;

@Component({
    templateUrl: './wizard.component.html',
    animations: [
        slideLeft,
    ],
    styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit, OnDestroy {
    title = '';

    showApiProgress = false;
    apiProgress = '0';
    apiProgressText = '';

    showProgress = false;

    progressStep = 0;
    stepsLength = 0;

    buttonConfig: {
        label: string,
        iconClass: string,
        buttonClass: string,
        action?: () => {}
        isDisabled?: () => false
        isLoading?: () => false
    } = null;

    constructor(private wizardElemRef: ElementRef,
                private zone: NgZone,
                private activatedRoute: ActivatedRoute,
                private wizardService: WizardService,
                private wizardConfigStateEntity: WizardStateService) {

        wizardConfigStateEntity.init();

        // init steps from routing and get length
        this.wizardService.initSteps(activatedRoute.routeConfig.children);

        this.stepsLength = this.wizardService.getProgressStepsLength();

        this.wizardService.subscribe(WizardService.STEP_LOADED, (stepConfig) => {
            this.title = stepConfig.title;
            this.progressStep = stepConfig.progressStep;
            this.showProgress = stepConfig.showProgress;
            this.buttonConfig = stepConfig.buttonConfig;
        });

        this.wizardService.subscribe(WizardService.TOGGLE_API_BAR, (toggle: boolean) => {
            this.showApiProgress = toggle;
        });

        this.wizardService.subscribe(WizardService.API_BAR_PROGRESS, (data) => {
            this.apiProgress = data.percentage + '%';
            this.apiProgressText = data.message;
        });
    }

    resetWizard() {
        this.wizardService.resetWizard();
        this.wizardConfigStateEntity.init();
    }

    ngOnInit() {
        // display modal window
        this.zone.runOutsideAngular(() => {
            $(this.wizardElemRef.nativeElement).find('.modal')
                .modal({
                    backdrop: 'static',
                    keyboard: false
                })
                .modal('show');
        });
    }

    // manage animation state
    isSlideLeft(outlet) {
        return outlet.activatedRoute.routeConfig.path;
    }

    ngOnDestroy() {
        this.zone.runOutsideAngular(() => {
            $(this.wizardElemRef.nativeElement).find('.modal').modal('hide');
        });
    }

}
