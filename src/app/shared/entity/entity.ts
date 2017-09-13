import { Field } from './field';
import { FormComponent } from '../form/form/form.component';

export abstract class Entity {

    public abstract  endpoint: string;

    public fields: Field[];
    protected formInstance: FormComponent;

    abstract getFields(): Field[];

    // we customly manage the submit
    abstract submitAction(): void;

    constructor() {
        this.fields = this.getFields();
    }

    setForm(formInstance: FormComponent) {
        this.formInstance = formInstance;
    }

}
