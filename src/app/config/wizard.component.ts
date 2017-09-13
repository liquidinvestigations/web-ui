import { Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WizardService } from './wizard.service';
import { slideLeft, slideRight } from './wizard-routing.animation';

declare let $: any;

@Component({
    templateUrl: './wizard.component.html',
    animations: [
        slideLeft,
        slideRight
    ],
    styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {
    title = '';

    controls: { next: any, previous: any };

    step = 0;
    stepsLength = 0;

    constructor(
        private wizardElemRef: ElementRef,
        private zone: NgZone,
        private activatedRoute: ActivatedRoute,

        private wizardService: WizardService,
    ) {
        this.stepsLength =
            this.wizardService.initSteps(activatedRoute.routeConfig.children);

        this.controls = this.wizardService.getControls();

        this.wizardService.manageTitle((title) => { this.title = title; });
        this.wizardService.manageStep((step) => { this.step = step; });
    }

    ngOnInit() {
        this.zone.runOutsideAngular(() => {
            $(this.wizardElemRef.nativeElement).find('.modal').modal('show');
        });
    }

    isSlideLeft(outlet) {
        return this.wizardService.direction === WizardService.IS_NEXT
            ? outlet.activatedRoute.routeConfig.path
            : null;
    }

    isSlideRight(outlet) {
        return this.wizardService.direction === WizardService.IS_PREV
            ? outlet.activatedRoute.routeConfig.path
            : null;
    }
}
