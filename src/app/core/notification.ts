export class Notification {

    public readonly TYPE_INFO = 'info';
    public readonly TYPE_SUCCESS = 'success';
    public readonly TYPE_WARNING = 'warning';
    public readonly TYPE_DANGER = 'danger';

    constructor(public type = 'info') {

    }


}