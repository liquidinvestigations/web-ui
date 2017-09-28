import { ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { DynamicElementRendererBase } from './dynamic-element-renderer.base';
import { DynamicFormControl } from '../../builder/dynamic-form-control';
import { DynamicFormGroup } from '../../builder/dynamic-form-group';

@Directive({
    selector: '[dynamicElementRenderer]',
})
export class CustomElementRenderDirective implements OnInit {

    @Input() dynamicElementRenderer: DynamicElementRendererBase | any;
    @Input() control: DynamicFormControl;
    @Input() fg: DynamicFormGroup;

    constructor(
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {}

    ngOnInit() {

        if (this.dynamicElementRenderer) {
            let componentFactory = this.componentFactoryResolver.resolveComponentFactory(
                this.dynamicElementRenderer
            );

            this.viewContainerRef.clear();

            let component = this.viewContainerRef.createComponent(componentFactory);
            let instance = component.instance;
            instance['control'] = this.control;
            instance['fg'] = this.fg;
        }

    }
}
