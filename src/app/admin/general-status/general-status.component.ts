import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
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

    constructor(
        protected apiService: ApiClientService,
    ) {
        Observable.forkJoin(
            this.apiService.get('/api/network/lan').map(res => res.json()),
            this.apiService.get('/api/network/wan').map(res => res.json()),
            this.apiService.get('/api/services').map(res => res.json()),
            this.apiService.get('/api/network/status').map(res => res.json()),
        ).subscribe((apiResponses: any) => {
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
