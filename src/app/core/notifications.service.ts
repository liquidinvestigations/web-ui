import { Injectable, NgZone } from '@angular/core';

declare let $: any;

@Injectable()
export class NotificationsService {

    constructor(private zone: NgZone) {

    }

    show(message: string, type: string = 'info', iconClass: string = '', from: string = 'top', align: string = 'center') {
        this.zone.runOutsideAngular(() => {

            let notify =
                $.notify({
                    icon: iconClass,
                    message: message

                }, {
                    newest_on_top: true,
                    type: type,
                    timer: 40000000000,
                    placement: {
                        from: from,
                        align: align
                    }
                });

        });
    }
}