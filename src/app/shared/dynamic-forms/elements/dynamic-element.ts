
export class DynamicElement {

    public static readonly DEFAULT_DEBOUNCE = 300;

    public static readonly TYPE_TEXT = 'text';
    public static readonly TYPE_PASSWORD = 'password';
    public static readonly TYPE_CHECKBOX = 'checkbox';

    public getterArguments = [];
    public isRemovable = false;

    /**
     * Define value  property with setter and getter
     * @type {string}
     * @private
     */
    private _value: string | Function = '';
    get value () { return this.generalGetter('_value'); }
    set value (value) { this._value = value ; }

    /**
     * Define renderer property with setter and getter
     */
    private _renderer: any;
    get renderer () { return this.generalGetter('_renderer'); }
    set renderer(renderer) { this._renderer = renderer; }

    /**
     * Define label property with setter and getter
     */
    private _label: string | Function;
    get label () { return this.generalGetter('_label'); }
    set label(label) { this._label = label; }

    /**
     * Define placeholder  property with setter and getter
     * @type {string}
     * @private
     */
    private _placeholder: string | Function = '';
    get placeholder () { return this.generalGetter('_placeholder'); }
    set placeholder (placeholder ) { this._placeholder  = placeholder ; }

    /**
     * Define mask property with setter and getter
     * @type {Array}
     * @private
     */
    private _mask: (string | RegExp)[] = [];
    get mask () { return this.generalGetter('_mask'); }
    set mask(mask) { this._mask = mask; }

    /**
     * Define controlType property with setter and getter
     */
    private _controlType: string | Function;
    get controlType () { return this.generalGetter('_controlType'); }
    set controlType(controlType) { this._controlType = controlType; }

    /**
     * Define type property with setter and getter
     */
    private _type: string | Function;
    get type () { return this.generalGetter('_type'); }
    set type(type) { this._type = type; }

    public enableTextToogle = false;
    public validators: any[] = [];

    hasTopDivider = false;
    hasBottomDivider = false;

    cssClass = 'col-xs-12';

    public debounceTime: number = DynamicElement.DEFAULT_DEBOUNCE;

    public onChangeHandler: Function = null;

    constructor(public id?: string, label?: string) {
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

    setEnableTextToggle() {
        this.enableTextToogle = true;
        return this;
    }

    setHasBottomDivider() {
        this.hasBottomDivider = true;
        return this;
    }

    setIsRemovable() {
        this.isRemovable = true;
        return this;
    }

    private generalGetter(key) {
        if (this[key] instanceof Function) {
            return this[key].apply(this, this.getterArguments);
        }
        return this[key];
    }
}

