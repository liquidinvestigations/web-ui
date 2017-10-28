import { Component } from '@angular/core';
import { ApiClientService } from '../../../core/api-client.service';
import { mapSummaryConfig } from '../../../shared/li-forms/summary-mapping';

@Component({
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.scss']
})
export class StatusComponent {
    currentConfig: any[] = [];

    constructor(protected apiService: ApiClientService) {

        this.apiService.get([
            '/api/network/lan/',
            '/api/network/wan/',
            '/api/network/domain/'
        ])
            .subscribe((apiResponses: any) => {
                let lanMapping = mapSummaryConfig({lan : apiResponses[0] });
                let wanMapping = mapSummaryConfig({ wan: apiResponses[1] });

                this.currentConfig = [
                    {
                        title: 'Domain',
                        fields: [
                            {
                                label: apiResponses[2].domain,
                                value: {
                                    btnClass: 'btn btn-primary',
                                    iconClass: 'fa fa-globe',
                                    label: 'Change domain',

                                }
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

    showAsBullets(label) {
        return label.replace(/./g, '*');
    }

}
