import { Component, ViewChild } from '@angular/core';
import { BsModalComponent } from '../../../shared/bs-modal/bs-modal.component';
import { DynamicFormGroup } from '../../../shared/dynamic-forms/builder/dynamic-form-group';
import { DynamicFormControl } from '../../../shared/dynamic-forms/builder/dynamic-form-control';
import { ApiClientService } from '../../../core/api-client.service';

@Component({
    templateUrl: './vpn-client.component.html',
    styleUrls: ['./vpn-client.component.scss']
})
export class VpnClientComponent {
    @ViewChild('uploadKeyModal') uploadKeyModalComponent: BsModalComponent;
    uploadKeyFormConfig: DynamicFormGroup;
    isClientEnabled: boolean = false;

    constructor(private apiService: ApiClientService) {

        this.uploadKeyFormConfig = new DynamicFormGroup()
            .elements([
                new DynamicFormControl('upload')
                    .setControlCssClass('col-xs-12 text-center')
                    .setControlType(DynamicFormControl.TYPE_FILE)
            ]);

        this.init();
    }

    showUploadKeyModal() {
        this.uploadKeyFormConfig.reset();
        this.uploadKeyModalComponent.show();
    }

    uploadKey(formValues) {
        this.uploadKeyModalComponent.hide();

        this.apiService
            .upload(
                '/api/vpn/client/upload/',
                'application/x-openvpn-profile',
                formValues.upload
            )
            .subscribe();
    }

    init() {
        this.apiService.get('/api/vpn/')
            .subscribe((response: any) => {
                this.isClientEnabled = response['client'].is_enabled;
            });
    }

    toggleClientStatus() {
        this.apiService
            .put('/api/vpn/client/', {is_enabled: !this.isClientEnabled})
            .subscribe(() => {
                this.init();
            });
    }
}
