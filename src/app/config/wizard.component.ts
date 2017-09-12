import { Component, ElementRef, HostBinding, NgZone, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WizardService } from './wizard.service';
import { slideLeft, slideRight } from './wizard-routing.animation';

declare let $: any;

@Component({
    selector: 'app-wizard',
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
        private wizardService: WizardService,
        private wizardRef: ElementRef,
        private zone: NgZone,
        private activatedRoute: ActivatedRoute
    ) {
        this.stepsLength =
            this.wizardService.initSteps(activatedRoute.routeConfig.children);

        this.controls = this.wizardService.getControls();

        this.wizardService.manageTitle((title) => { this.title = title; });
        this.wizardService.manageStep((step) => { this.step = step });
    }

    ngOnInit() {
        this.zone.runOutsideAngular(() => {
            $(this.wizardRef.nativeElement).find('.modal').modal('show');
        });
    }

    isSlideLeft(outlet) {
        return this.wizardService.isNext()
            ? outlet.activatedRoute.routeConfig.path
            : null;
    }

    isSlideRight(outlet) {
        return this.wizardService.isPrev()
            ? outlet.activatedRoute.routeConfig.path
            : null;
    }
}
