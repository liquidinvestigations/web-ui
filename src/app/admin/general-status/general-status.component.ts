import { Component } from '@angular/core';
import { ApiClientService } from '../../core/api-client.service';
import { mapSummaryConfig } from '../../shared/li-forms/summary-mapping';

@Component({
    templateUrl: './general-status.component.html',
    styleUrls: ['./general-status.component.scss']
})
export class GeneralStatusComponent {
    currentConfig: any[] = [
        {
            title: 'Lan configuration',
        },
        {
            title: 'Wan configuration',
        }
    ];

    services: any[] = [];

    constructor(protected apiService: ApiClientService) {

            this.apiService.get([
                '/api/network/lan',
                '/api/network/wan',
                '/api/services',
                '/api/network/status'
            ]).subscribe((apiResponses: any) => {

            let lanMapping = mapSummaryConfig(apiResponses[0]);
            let wanMapping = mapSummaryConfig(apiResponses[1]);

            this.services = apiResponses[2];

            this.currentConfig = [

                {
                    title: 'Lan configuration',
                    fields: lanMapping['lan'].fields
                },
                {
                    title: 'Wan configuration',
                    fields: wanMapping['wan'].fields
                }
            ];
        });
    }

}
