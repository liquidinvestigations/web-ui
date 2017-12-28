import { Component, ViewChild } from '@angular/core';
import { ApiClientService } from '../../core/api-client.service';
import { BsModalComponent } from '../../shared/bs-modal/bs-modal.component';

@Component({
    templateUrl: './general-status.component.html',
})
export class GeneralStatusComponent {
    @ViewChild('confirmationModal') confirmationModal: BsModalComponent;

    currentConfig: {} = {
        title: 'Messages'
    };

    confirmation: {
        title: string,
        body: string,
        ok: {
            iconClass: string,
            buttonClass: string,
            text: string,
            action: () => void
        }
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

    confirmReboot() {
        this.confirmation = {
            title: 'Confirm system reboot',
            body: 'Are you sure you want to restart the system?',
            ok: {
                iconClass: 'fa fa-refresh',
                buttonClass: 'btn btn-warning',
                text: 'Reboot',
                action: () => {
                    this.confirmationModal.hide();
                    this.shutdown(true);
                }
            }
        };

        this.confirmationModal.show();
    }

    confirmShutDown() {
        this.confirmation = {
            title: 'Confirm system shutdown',
            body: 'Are you sure you want to shutdown the system?',
            ok: {
                iconClass: 'fa fa-power-off',
                buttonClass: 'btn btn-danger',
                text: 'Shutdown',
                action: () => {
                    this.confirmationModal.hide();
                    this.shutdown(false);
                }
            }
        };

        this.confirmationModal.show();
    }

    shutdown(reboot: boolean = false) {
        this.apiService
            .post('/api/shutdown/', { action: (reboot ? 'reboot' : 'poweroff') })
            .subscribe();
    }
}
