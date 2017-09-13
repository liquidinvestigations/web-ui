import { ElementBase } from '../form/elements/definitions/element.base';
import { FormConfig } from '../form/form/formConfig';

export class Field {
    public name: string;
    public label: string;

    private formConfig: ElementBase<any>;

    constructor(name: string, label: string = null) {
        this.name = name;
        this.label = !label ? name : label;
    }

    setFormConfig(formConfig: FormConfig) {
        this.formConfig = formConfig.get();
        return this;
    }

    getFormConfig() {
        return this.formConfig;
    }

}
