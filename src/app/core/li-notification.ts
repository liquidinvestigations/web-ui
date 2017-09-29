export class LiNotification {

    public static readonly TYPE_INFO = 'info';
    public static readonly TYPE_SUCCESS = 'success';
    public static readonly TYPE_WARNING = 'warning';
    public static readonly TYPE_DANGER = 'danger';

    constructor(public type = 'info') {

    }


}