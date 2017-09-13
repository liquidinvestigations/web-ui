import { Injectable } from '@angular/core';
import { Entity } from '../../../shared/entity/entity';
import { Field } from '../../../shared/entity/field';
import { FormConfig } from '../../../shared/form/form/formConfig';

@Injectable()
export class GeneralEntity extends Entity {

    constructor() {
        super();
    }

    endpoint: string;

    getFields(): Field[] {
        return [
            new Field('hostname', 'Hostname')
                .setFormConfig(
                    new FormConfig()
                        .setIsInput()
                        .setIsRequired()
                ),
            new Field('username', 'Username')
                .setFormConfig(
                    new FormConfig()
                        .setIsInput()
                        .setIsRequired()
                ),
            new Field('password', 'Password')
                .setFormConfig(
                    new FormConfig()
                        .setIsInput()
                        .setIsRequired()
                ),
            new Field('confirm_password', 'Confirm password')
                .setFormConfig(
                    new FormConfig()
                        .setIsInput()
                        .setIsRequired()
                ),
        ];
    }

    submitAction() {

    }

}
