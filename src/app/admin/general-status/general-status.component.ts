import { Component } from '@angular/core';
import { ApiClientService } from '../../core/api-client.service';

@Component({
    templateUrl: './general-status.component.html',
    styleUrls: ['./general-status.component.scss']
})
export class GeneralStatusComponent {
    currentConfig: {} = {};

    services: any[] = [];

    constructor(protected apiService: ApiClientService) {

        this.apiService.get(
            'api/network/status/'
        ).subscribe((statusResponse: any) => {
            this.currentConfig = statusResponse;
        });
    }

}
