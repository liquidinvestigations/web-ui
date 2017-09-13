import { Field } from './field';

export abstract class Entity {

    public abstract  endpoint: string;

    public fields: Field[];

    abstract getFields(): Field[];

    // we customly manage the submit
    abstract submitAction(): void;

    constructor() {
        this.fields = this.getFields();
    }

}
