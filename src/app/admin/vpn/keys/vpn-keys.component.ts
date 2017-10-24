import { Component, ViewChild } from '@angular/core';
import { ApiClientService } from '../../../core/api-client.service';
import { BsModalComponent } from '../../../shared/bs-modal/bs-modal.component';
import { DynamicFormGroup } from '../../../shared/dynamic-forms/builder/dynamic-form-group';
import { DynamicFormControl } from '../../../shared/dynamic-forms/builder/dynamic-form-control';
import { Validators } from '@angular/forms';

@Component({
    templateUrl: './vpn-keys.component.html',
    styleUrls: ['./vpn-keys.component.scss']
})
export class VpnKeysComponent {
    @ViewChild('generateKeyModal') generateKeyModalComponent: BsModalComponent;
    @ViewChild('keyDetailsModal') keyDetailsModalComponent: BsModalComponent;
    @ViewChild('revokeKeyModal') revokeKeyModalComponent: BsModalComponent;

    generateKeyFormConfig: DynamicFormGroup;
    revokeKeyFormConfig: DynamicFormGroup;

    tableColumns = [
        {
            name: 'label',
            label: 'Key name'
        }
    ];

    keys = [
        {
            title: 'Active keys',
            entries: []
        },
        {
            title: 'Revoked keys',
            entries: []
        }
    ];

    keyDetails: any[] = [];

    constructor(private apiService: ApiClientService) {
        this.getVpnKeys();

        this.generateKeyFormConfig = new DynamicFormGroup()
            .elements([
                new DynamicFormControl('label', 'Key name')
                    .setLabelCssClass('col-xs-12 col-sm-3 text-right')
                    .setControlCssClass('col-xs-12 col-sm-7')
                    .setControlType(DynamicFormControl.TYPE_TEXT)
                    .setValidators([Validators.required])
            ]);

        this.revokeKeyFormConfig = new DynamicFormGroup()
            .elements([
                new DynamicFormControl('id', '')
                    .setControlType(DynamicFormControl.TYPE_HIDDEN),

                new DynamicFormControl('revoked_reason', 'Reason')
                    .setLabelCssClass('col-xs-12 col-sm-3 text-right')
                    .setControlCssClass('col-xs-12 col-sm-7')
                    .setControlType(DynamicFormControl.TYPE_TEXT)
                    .setValidators([Validators.required])
            ]);
    }

    getVpnKeys() {
        this.apiService
            .get('/api/vpn/server/keys/')
            .subscribe((keys: any[]) => {
                this.keys[0].entries = [];
                this.keys[1].entries = [];

                for (let key of keys) {
                    if (!key.revoked) {
                        this.keys[0].entries.push(key);
                    } else {
                        this.keys[1].entries.push(key);
                    }
                }
            });
    }

    showGenerateKeyModal() {
        this.generateKeyFormConfig.reset();
        this.generateKeyModalComponent.show();
    }

    generateKey(formValues) {
        this.generateKeyModalComponent.hide();

        this.apiService.post('/api/vpn/server/keys/generate/', formValues)
            .subscribe(() => {
                this.getVpnKeys();
            });
    }

    showKeyDetailsModal(key) {
        this.apiService.get('/api/vpn/server/keys/' + key.id + '/')
            .subscribe((response) => {
                this.keyDetails = this.mapKeyDetails(response);
                this.keyDetailsModalComponent.show();
            });
    }

    downloadKey(key) {
        this.apiService.download(
            '/api/vpn/server/keys/' + key.id + '/download/',
            'application/x-openvpn-profile'
        )
            .subscribe(() => {});
    }

    showRevokeKeyModal(key) {
        this.revokeKeyFormConfig.reset();
        this.revokeKeyFormConfig.patchValue(key, { emitEvent: false });
        this.revokeKeyModalComponent.show();
    }

    revokeKey(formValues) {
        this.revokeKeyModalComponent.hide();

        let id = formValues['id'];
        delete formValues['id'];

        this.apiService.post('api/vpn/server/keys/' + id + '/revoke/', formValues)
            .subscribe(() => {
                this.getVpnKeys();
            });
    }

    private mapKeyDetails(response) {
        const mapping = {
            'label': {
                label: 'Key name'
            },
            'revoked': {
                label: 'Revoked'
            },
            'revoked_reason': {
                label: 'Reason'
            },
            'revoked_at': {
                label: 'Revoked at',
                filter: (value, key) => {
                    return 'Filter value' + value;
                }
            },
            'revoked_by': {
                label: 'Revoked by'
            }
        };
        let out = [];

        for (let prop in response) {
            if (response.hasOwnProperty(prop) && mapping[prop] && response[prop] !== null) {
                let iconClass = '';
                let itemValue = response[prop];
                let displayValue = response[prop];

                switch (typeof itemValue) {
                    case 'boolean':
                        iconClass = response[prop] ? 'fa fa-check text-success' : 'fa fa-times text-danger';
                        displayValue = '';
                        break;
                }

                let item = Object.create(mapping[prop]);
                item.value = itemValue;
                item.displayValue = item.filter ? item.filter(displayValue, response) : displayValue;
                item.iconClass = iconClass;

                out.push(item);
            }
        }

        return out;
    }

}
