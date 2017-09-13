import { Injectable } from '@angular/core';
import { Entity } from '../../../shared/entity/entity';
import { Field } from '../../../shared/entity/field';
import { FormConfig } from '../../../shared/form/form/formConfig';
import { ApiClientService } from '../../../core/api-client.service';

@Injectable()
export class GeneralEntity extends Entity {

    endpoint = '/network/config';

    constructor(private apiService: ApiClientService) {
        super();
    }

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
        this.apiService.get(this);
    }

}
