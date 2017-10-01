import { Injectable } from '@angular/core';
import { LiEvents } from './li-events';

declare let $: any;

@Injectable()
export class LiNotificationsService extends LiEvents {

    public static readonly NOTIFICATION_SHOW = 'notification_show';
    public static readonly NOTIFICATION_SHOWN = 'notification_shown';

    public static readonly NOTIFICATION_CLOSE = 'notification_close';
    public static readonly NOTIFICATION_CLOSED = 'notification_closed';


    show(message: string, type: string = 'info', iconClass: string = '', from: string = 'bottom', align: string = 'right') {

        return $.notify({
            icon: iconClass,
            message: message

        }, {
            type: type,
            timer: 3000,
            placement: {
                from: from,
                align: align
            },
            onShow: (self: any) => {
                this.notifySubscribers(LiNotificationsService.NOTIFICATION_SHOW, self);
            },
            onShown: (self: any) => {
                this.notifySubscribers(LiNotificationsService.NOTIFICATION_SHOWN, self);
            },
            onClose: (self: any) => {
                this.notifySubscribers(LiNotificationsService.NOTIFICATION_CLOSE, self);
            },
            onClosed: (self: any) => {
                this.notifySubscribers(LiNotificationsService.NOTIFICATION_CLOSED, self);
            }
        });

    }
}
