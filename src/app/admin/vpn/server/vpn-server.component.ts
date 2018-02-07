import { Component, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { ApiClientService } from '../../../core/api-client.service';
import { BsModalComponent } from '../../../shared/bs-modal/bs-modal.component';
import { DynamicFormGroup } from '../../../shared/dynamic-forms/builder/dynamic-form-group';
import { DynamicFormControl } from '../../../shared/dynamic-forms/builder/dynamic-form-control';

@Component({
    templateUrl: './vpn-server.component.html',
    styleUrls: ['./vpn-server.component.scss']
})
export class VpnServerComponent {
    @ViewChild('serverAddressModal') serverAddressModalComponent: BsModalComponent;
    @ViewChild('generateKeyModal') generateKeyModalComponent: BsModalComponent;
    @ViewChild('keyDetailsModal') keyDetailsModalComponent: BsModalComponent;
    @ViewChild('revokeKeyModal') revokeKeyModalComponent: BsModalComponent;

    serverAddressFormConfig: DynamicFormGroup;
    generateKeyFormConfig: DynamicFormGroup;
    revokeKeyFormConfig: DynamicFormGroup;

    tableColumns = [
        {
            name: 'id',
            label: 'ID'
        },
        {
            name: 'label',
            label: 'Label'
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

    serverAddress: any = {};

    keyDetails: any[] = [];

    isServerEnabled: boolean = false;

    constructor(private apiService: ApiClientService) {
        this.serverAddressFormConfig = new DynamicFormGroup()
            .elements([
                new DynamicFormControl('address', 'Address')
                    .setLabelCssClass('col-xs-12 col-sm-3 text-right')
                    .setControlCssClass('col-xs-12 col-sm-7')
                    .setControlType(DynamicFormControl.TYPE_TEXT)
                    .setValidators([Validators.required]),

                new DynamicFormControl('port', 'Port')
                    .setLabelCssClass('col-xs-12 col-sm-3 text-right')
                    .setControlCssClass('col-xs-12 col-sm-7')
                    .setControlType(DynamicFormControl.TYPE_TEXT)
                    .setValidators([
                        Validators.required,
                        Validators.min(1),
                        Validators.max(65535),
                    ]),
            ]);

        this.generateKeyFormConfig = new DynamicFormGroup()
            .elements([
                new DynamicFormControl('label', 'Label')
                    .setLabelCssClass('col-xs-12 col-sm-3 text-right')
                    .setControlCssClass('col-xs-12 col-sm-7')
                    .setControlType(DynamicFormControl.TYPE_TEXT)
                    .setValidators([Validators.required])
            ]);

        this.revokeKeyFormConfig = new DynamicFormGroup()
            .elements([
                new DynamicFormControl('id', '')
                    .setFormGroupCssClass('hidden')
                    .setControlType(DynamicFormControl.TYPE_HIDDEN),

                new DynamicFormControl('label', 'Label')
                    .setFormGroupCssClass('hidden')
                    .setControlType(DynamicFormControl.TYPE_HIDDEN),

                new DynamicFormControl('revoked_reason', 'Reason')
                    .setLabelCssClass('col-xs-12 col-sm-3 text-right')
                    .setControlCssClass('col-xs-12 col-sm-7')
                    .setControlType(DynamicFormControl.TYPE_TEXT)
                    .setValidators([Validators.required])
            ]);

        this.init();
    }

    init() {
        this.getVpnKeys();

        this.apiService.get('/api/vpn/')
            .subscribe((response: any) => {
                this.isServerEnabled = response['server'].is_enabled;
                let addressValue = response['server']['address'];
                this.serverAddress = addressValue;
                this.serverAddressFormConfig.patchValue(addressValue, {emitEvent: false});
            });
    }

    saveServerAddress(formValues) {
        this.apiService
            .put('/api/vpn/server/address/', formValues)
            .subscribe(() => {
                this.init();
            });
    }

    toggleServerStatus() {
        this.apiService
            .put('/api/vpn/server/', {is_enabled: !this.isServerEnabled})
            .subscribe(() => {
                this.init();
            });
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

    getDownloadUrl(key) {
        return '/api/vpn/server/keys/' + key.id + '/download/';
    }

    showRevokeKeyModal(key) {
        this.revokeKeyFormConfig.reset();
        this.revokeKeyFormConfig.patchValue(key, {emitEvent: false});
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
                label: 'Label'
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
                    return value.date().format('YYYY-MM-DD hh:mm');
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
                        displayValue = response[prop] ? 'yes' : 'no';
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
