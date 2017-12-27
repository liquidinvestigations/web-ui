import { Component } from '@angular/core';
import { ApiClientService } from '../../core/api-client.service';

@Component({
    templateUrl: './general-status.component.html',
})
export class GeneralStatusComponent {
    currentConfig: {} = {
        title: 'Messages'
    };

    constructor(protected apiService: ApiClientService) {
        apiService.get('/api/status/')
            .subscribe((data) => {
                this.currentConfig = {
                    title: 'Messages',
                    fields: data && data['messages']
                        ? data['messages'].map((message) => {
                            return {
                                label: message.title,
                                value: message.text
                            };
                        })
                        : null
                };
            });
    }
}
