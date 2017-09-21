import { DynamicFormGroup } from './group/dynamic-form-group';
import { DynamicElement } from './elements/dynamic-element';

export class DynamicForm extends DynamicFormGroup {

    public _elementsArray: (DynamicFormGroup | DynamicElement)[];

    elements(elements: (DynamicFormGroup | DynamicElement)[] = []) {
        this._elementsArray = [
            new DynamicFormGroup(this.id)
                .elements(elements)
        ];
        return this;
    }

}