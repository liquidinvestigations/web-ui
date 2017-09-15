import { FormComponent } from '../form/form.component';
import { DynamicFormControlModel } from '@ng-dynamic-forms/core/src/model/dynamic-form-control.model';

export abstract class Entity {

    public endpoint?: string;

    public fields: DynamicFormControlModel[];
    protected formInstance: FormComponent;

    abstract getFields(): DynamicFormControlModel[];

    // we customly manage the submit
    abstract submitAction(...args): void;

    constructor() {
        this.fields = this.getFields();
    }

    getForm() {
        return this.formInstance;
    }

    setForm(formInstance: FormComponent) {
        this.formInstance = formInstance;
    }

    setDefaultValues() {

    }

}
