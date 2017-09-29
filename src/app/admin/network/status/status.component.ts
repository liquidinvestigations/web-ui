import { Component } from '@angular/core';
import { mapSummaryConfig } from '../../../shared/li-forms/summary-mapping';
import { AdminEntity } from '../../admin.entity';

@Component({
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.scss']
})
export class StatusComponent {
    currentConfig;

    constructor(protected adminEntity: AdminEntity) {

        if (this.adminEntity.configState) {
            this.currentConfig = mapSummaryConfig(this.adminEntity.configState);
        } else {
            this.adminEntity.subscribe(AdminEntity.API_CONFIG_LOADED, (config) => {
                this.currentConfig = mapSummaryConfig(config);
            });
        }
    }

}
