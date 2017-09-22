import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DynamicElement } from './elements/dynamic-element';
import { DynamicFormGroup } from './group/dynamic-form-group';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { DynamicFormArray } from './group/dynamic-form-array';

@Injectable()
export class DynamicFormService {

    public fieldsMapping: { [id: string]: string[] }[] = [];
    public arrayFields: { [id: string]: string[] }[] = [];

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

    createGroup(group: DynamicFormGroup, chainPath: string[]) {
        let builtForm = {};

        let currentPath = chainPath.slice();

        for (let element of group._elementsArray) {

            if (element instanceof DynamicElement) {

                this.registerPath(element, currentPath);
                builtForm[element.id] = [ element.value, element.validators ];

            } else if (element instanceof DynamicFormGroup) {
                chainPath.push(element.id);
                builtForm[element.id] = this.fb.group({}, { validator: element.validator });
            }
        }

        return this.fb.group(builtForm, { validator: group.validator });
    }

    createArray(formArray: DynamicFormArray, chainPath: any[]) {
        let builtForm = [];

        this.registerPath(formArray, chainPath);
        this.arrayFields[formArray.id] = chainPath.concat([formArray.id]);

        for (let element of formArray._elementsArray) {

            if (element instanceof DynamicElement) {
                let control = {};
                control[element.id] = [element.value, element.validators];
                builtForm.push(this.fb.group(control));
            }
        }

        return this.fb.array(builtForm);
    }

    registerPath(element: (DynamicElement | DynamicFormArray), path: string[]) {
        this.fieldsMapping[element.id] = path.concat([element.id]);
    }

    registerHandlers(element: DynamicElement) {
        if (element.onChangeHandler instanceof Function) {
            let formControl = this.currentForm.get(this.fieldsMapping[element.id]);
            formControl
                .valueChanges
                .debounceTime(DynamicElement.DEFAULT_DEBOUNCE)
                .subscribe((value: any) => {
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

    flattenArrays(formValues) {
        // for (let path of this.arrayFields) {
        //     let pointer = formValues;
        //
        //     for (let segment of path) {
        //         pointer = pointer[segment];
        //     }
        //
        //
        // }

        return formValues;
    }
}
