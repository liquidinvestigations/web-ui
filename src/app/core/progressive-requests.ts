import { LiEvents } from './li-events';
import { Observable } from 'rxjs/Observable';

export class ProgressiveRequests extends LiEvents {

    public static readonly API_PROGRESS_BAR_INCREMENT = 'next_request';
    public static readonly API_PROGRESS_BAR_END = 'request_end';

    constructor(private requests: ProgressiveRequest[]) {
        super();
        this.performRequests();
    }

    private performRequests() {

        let total = this.requests.length;

        let slice = 100 / total;

        let request = (apiCalls, percentage) => {
            let call = apiCalls.shift();

            if (!call) {
                this.notifySubscribers(ProgressiveRequests.API_PROGRESS_BAR_END, {
                    percentage: 100,
                    message: 'Completed',
                });
                return;
            }

            call.request
                .subscribe((data) => {
                    this.notifySubscribers(ProgressiveRequests.API_PROGRESS_BAR_INCREMENT, {
                        percentage: percentage,
                        message: call.message,
                        data: data
                    });

                    request(apiCalls, percentage + slice);
                });
        };

        request(this.requests, 0);
    }

}

export interface ProgressiveRequest {
    request: Observable<any>;
    message: string;
}
