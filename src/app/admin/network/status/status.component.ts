import { Component, ViewChild } from '@angular/core';
import { ApiClientService } from '../../../core/api-client.service';
import { mapSummaryConfig } from '../../../shared/li-forms/summary-mapping';
import { BsModalComponent } from '../../../shared/bs-modal/bs-modal.component';
import { DynamicFormGroup } from '../../../shared/dynamic-forms/builder/dynamic-form-group';
import { DynamicFormControl } from '../../../shared/dynamic-forms/builder/dynamic-form-control';
import { Validators } from '@angular/forms';
import { DynamicFormValidator } from '../../../shared/dynamic-forms/validation/dynamic-form.validator';

@Component({
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.scss']
})
export class StatusComponent {
    @ViewChild('changeDomainModal') changeDomainModal: BsModalComponent;

    changeDomainFormConfig: DynamicFormGroup;

    currentConfig: any[] = [];

    constructor(protected apiService: ApiClientService) {

        this.changeDomainFormConfig =
            new DynamicFormGroup()
                .elements([
                    new DynamicFormControl('domain', 'Domain')
                        .setControlType(DynamicFormControl.TYPE_TEXT)
                        .setLabelCssClass('col-xs-12 col-sm-3 text-right')
                        .setControlCssClass('col-xs-12 col-sm-7')
                        .setValidators([Validators.required, DynamicFormValidator.hostnameValidator])
                ]);

        this.init();
    }


    init() {
        this.apiService.get([
            '/api/network/lan/',
            '/api/network/wan/',
            '/api/network/domain/'
        ])
            .subscribe((apiResponses: any) => {
                let lanMapping = mapSummaryConfig({lan: apiResponses[0]});
                let wanMapping = mapSummaryConfig({wan: apiResponses[1]});

                this.currentConfig = [
                    {
                        title: 'Domain',
                        fields: [
                            {
                                label: apiResponses[2].domain,
                                fields: null,

                                // @see https://github.com/liquidinvestigations/liquidinvestigations/issues/231
                                // button: {
                                //     buttonClass: 'change-domain',
                                //     iconClass: 'fa fa-globe',
                                //     label: 'Change domain name',
                                //     action: () => {
                                //         this.changeDomainFormConfig.reset();
                                //         this.changeDomainModal.show();
                                //     }
                                // }
                            }
                        ]
                    },
                    {
                        title: 'Lan configuration',
                        fields: lanMapping['lan'].fields
                    },
                    {
                        title: 'Wan configuration',
                        fields: wanMapping['wan'].fields
                    },
                ];
            });
    }

    switchToText(field) {
        field.showAsText = !field.showAsText;
    }

    isPasswordText(field) {
        return field.label.toLowerCase() === 'password';
    }

    showAsBullets(count) {
        return (new Array(count + 1)).join('*');
    }

    changeDomain(formValues) {
        this.changeDomainModal.hide();
        this.apiService.put('/api/network/domain/', formValues)
            .subscribe(() => {
                this.init();
            });
    }
}
