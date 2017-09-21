
export class DynamicElement {

    public static readonly DEFAULT_DEBOUNCE = 300;

    public static readonly TYPE_TEXT = 'text';
    public static readonly TYPE_PASSWORD = 'password';
    public static readonly TYPE_CHECKBOX = 'checkbox';

    public getterArguments = [];

    /**
     * Define value  property with setter and getter
     * @type {string}
     * @private
     */
    private _value: string | Function = '';
    get value () {
        if (this._value instanceof Function) {
            return this._value.apply(this, this.getterArguments);
        }
        return this._value ;
    }
    set value (value ) { this._value  = value ; }

    /**
     * Define renderer property with setter and getter
     */
    private _renderer: any;
    get renderer() {
        if (this._renderer instanceof Function) {
            return this._renderer.apply(this, this.getterArguments);
        }
        return this._renderer;
    }
    set renderer(renderer) { this._renderer = renderer; }

    /**
     * Define label property with setter and getter
     */
    private _label: string | Function;
    get label() {
        if (this._label instanceof Function) {
            return this._label.apply(this, this.getterArguments);
        }
        return this._label;
    }
    set label(label) { this._label = label; }

    /**
     * Define placeholder  property with setter and getter
     * @type {string}
     * @private
     */
    private _placeholder: string | Function = '';
    get placeholder () {
        if (this._placeholder  instanceof Function) {
            return this._placeholder.apply(this, this.getterArguments);
        }
        return this._placeholder ;
    }
    set placeholder (placeholder ) { this._placeholder  = placeholder ; }

    /**
     * Define required property with setter and getter
     */
    private _required: boolean | Function;
    get required() {
        if (this._required instanceof Function) {
            return this._required.apply(this, this.getterArguments);
        }
        return this._required;
    }
    set required(required) { this._required = required; }

    /**
     * Define order property with setter and getter
     */
    private _order: number | Function;
    get order() {
        if (this._order instanceof Function) {
            return this._order.apply(this, this.getterArguments);
        }
        return this._order;
    }
    set order(order) { this._order = order; }

    /**
     * Define mask property with setter and getter
     * @type {Array}
     * @private
     */
    private _mask: (string | RegExp)[] = [];
    get mask() {
        if (this._mask instanceof Function) {
            return this._mask.apply(this, this.getterArguments);
        }
        return this._mask;
    }
    set mask(mask) { this._mask = mask; }

    /**
     * Define controlType property with setter and getter
     */
    private _controlType: string | Function;
    get controlType() {
        if (this._controlType instanceof Function) {
            return this._controlType.apply(this, this.getterArguments);
        }
        return this._controlType;
    }
    set controlType(controlType) { this._controlType = controlType; }

    /**
     * Define type property with setter and getter
     */
    private _type: string | Function;
    get type() {
        if (this._type instanceof Function) {
            return this._type.apply(this, this.getterArguments);
        }
        return this._type;
    }
    set type(type) { this._type = type; }

    /**
     * Define validators property with setter and getter
     * @type {Array}
     * @private
     */
    private _validators: any[] = [];
    get validators() {
        if (this._validators instanceof Function) {
            return this._validators.apply(this, this.getterArguments);
        }
        return this._validators;
    }
    set validators(validators) { this._validators = validators; }

    /**
     * Define options property with setter and getter
     */
    private _options: { key: string; value: string; }[];
    get options() {
        if (this._options instanceof Function) {
            return this._options.apply(this, this.getterArguments);
        }
        return this._options;
    }
    set options(options) { this._options = options; }


    hasTopDivider = false;
    hasBottomDivider = false;

    cssClass = 'col-xs-12';

    public debounceTime: number = DynamicElement.DEFAULT_DEBOUNCE;

    public onChangeHandler: Function = null;

    constructor(public id: string, label?: string) {
        this.label = label || '';
    }

    setType(controlType: string | Function) {
        this.controlType = controlType;
        this.type = controlType;
        return this;
    }

    setValue(value: string | Function) {
        this.value = value;
        return this;
    }

    setPlaceholder(placeholder: string | Function) {
        this._placeholder = placeholder;
        return this;
    }

    setLabel(label: string | Function) {
        this.label = label;
        return this;
    }

    setRenderer(renderer: any) {
        this.renderer = renderer;
        return this;
    }

    onChange(onChangeHandler: Function) {
        this.onChangeHandler = onChangeHandler;
        return this;
    }

    setChangeDebounce(debounceTime) {
        this.debounceTime = debounceTime;
        return this;
    }

    setValidators(validators: any[]) {
        this.validators = validators;
        return this;
    }

    setMask(mask: (string | Function | RegExp)[]) {
        this.mask = mask;
        return this;
    }

    setCssClass(cssClass: string) {
        this.cssClass = cssClass;
        return this;
    }

    setHasTopDivider() {
        this.hasTopDivider = true;
        return this;
    }

    setHasBottomDivider() {
        this.hasBottomDivider = true;
        return this;
    }

}

