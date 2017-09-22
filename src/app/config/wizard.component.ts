import { Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WizardService } from './wizard.service';
import { slideLeft } from './wizard-routing.animation';
import { WizardEntity } from './wizard.entity';

declare let $: any;

@Component({
    templateUrl: './wizard.component.html',
    animations: [
        slideLeft,
    ],
    styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {
    title = '';

    showProgress = false;

    progressStep = 0;
    stepsLength = 0;

    buttonConfig: {
        label: string,
        iconClass: string,
        buttonClass: string,
        action?: () => {}
        disabled?: boolean
    } = null;

    constructor(private wizardElemRef: ElementRef,
                private zone: NgZone,
                private activatedRoute: ActivatedRoute,
                private wizardEntity: WizardEntity,
                private wizardService: WizardService,
    ) {

        if (!wizardEntity.getConfigState()) {
            this.wizardService.resetWizard();
        }

        // init steps from routing and get length
        this.wizardService.initSteps(activatedRoute.routeConfig.children);

        this.stepsLength = this.wizardService.getProgressStepsLength();

        this.wizardService.subscribe(WizardService.STEP_LOADED, (stepConfig) => {
            this.title = stepConfig.title;
            this.progressStep = stepConfig.progressStep;
            this.showProgress = stepConfig.showProgress;
            this.buttonConfig = stepConfig.buttonConfig;
        });
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

}
