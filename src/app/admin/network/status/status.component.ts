import { Component } from '@angular/core';
import { ApiClientService } from '../../../core/api-client.service';
import { mapSummaryConfig } from '../../../shared/li-forms/summary-mapping';

@Component({
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.scss']
})
export class StatusComponent {
    currentConfig: any[] = [];

    constructor(protected apiService: ApiClientService,) {

        this.apiService.get([
            '/api/network/lan',
            '/api/network/wan'
        ])
            .subscribe((apiResponses: any) => {
                let lanMapping = mapSummaryConfig(apiResponses[0]);
                let wanMapping = mapSummaryConfig(apiResponses[1]);

                this.currentConfig = [
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

}
