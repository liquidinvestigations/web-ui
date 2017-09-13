import { TextElement } from '../elements/definitions/text.element';
import { DropdownElement } from '../elements/definitions/dropdown.element';
import { ElementBase } from '../elements/definitions/element.base';

export class FormConfig {

    private readonly types: {} = {
        text: TextElement,
        dropdown: DropdownElement,
    };

    private _isRequired = false;
    private _value = null;

    private _type: any;
    private _order: any;
    private _options: {key: string, value: any}[];

    get value() {
        return this._value;
    }

    setIsInput() {
        this._type = 'text';
        return this;
    }

    setIsDropDown() {
        this._type = 'dropdown';
        return this;
    }

    setDefaultValue(value: any = null) {
        this._value = value;
        return this;
    }

    setType(type: string) {
        this._type = type;
        return this;
    }

    setOrder(order: number) {
        this._order = order;
        return this;
    }

    setOptions(options: {key: string, value: any}[]) {
        this._options = options;
        return this;
    }

    setIsRequired() {
        this._isRequired = true;
        return this;
    }

    get(): ElementBase<any> {
        return new this.types[this._type]({
            type: this._type,
            order: this._order,
            options: this._options,
            required: this._isRequired,
        });
    }
}
