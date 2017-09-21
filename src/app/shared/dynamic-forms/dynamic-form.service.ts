import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DynamicElement } from './elements/dynamic-element';
import { DynamicFormGroup } from './group/dynamic-form-group';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

@Injectable()
export class DynamicFormService {

    public fieldsMapping: { [id: string]: string[] }[] = [];

    fb: FormBuilder;

    formRenderer: any;

    private currentForm: FormGroup;

    constructor() {
        this.fb = new FormBuilder;
    }

    createElement(element: DynamicElement, chainPath: string[]) {

        this.registerPath(element, chainPath.slice());
        return new FormControl(element.value, element.validators);
    }

    createGroup(elements: (DynamicFormGroup | DynamicElement)[], chainPath: string[]) {
        let builtForm = {};

        let currentPath = chainPath.slice();

        for (let element of elements) {

            if (element instanceof DynamicElement) {

                this.registerPath(element, currentPath);
                builtForm[element.id] = [element.value, element.validators];

            } else if (element instanceof DynamicFormGroup) {
                chainPath.push(element.id);
                builtForm[element.id] = this.fb.group({});
            }
        }

        return this.fb.group(builtForm);
    }

    registerPath(element: DynamicElement, path: string[]) {
        this.fieldsMapping[element.id] = path.concat([element.id]);
    }

    registerHandlers(element: DynamicElement) {
        if (element.onChangeHandler instanceof Function) {
            let formControl = this.currentForm.get(this.fieldsMapping[element.id]);
            formControl
                .valueChanges
                .debounceTime(DynamicElement.DEFAULT_DEBOUNCE)
                .subscribe((value: any) => {
                    formControl.markAsTouched();
                    element.onChangeHandler(value, this.fieldsMapping, this.currentForm);
                });
        }
    }

    addGetterArguments(element: DynamicElement) {
        element.getterArguments = [element, this.fieldsMapping, this.currentForm];
    }

    addFormRenderer(formRenderer: any) {
        this.formRenderer = formRenderer;
    }

    manageForm(form: FormGroup) {
        this.currentForm = form;
    }
}
