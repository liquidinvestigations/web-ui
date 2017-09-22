import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { LiEvents } from './li-events';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/share';

declare let $: any;

@Injectable()
export class ApiClientService extends LiEvents {
    static readonly EV_BEFORE_GET = 'before_read';
    static readonly EV_GET_SUCCESSFUL = 'get_successful';

    static readonly EV_BEFORE_PUT = 'before_put';
    static readonly EV_PUT_SUCCESSFUL = 'put_successful';

    private headers: Headers;

    constructor(private http: Http) {
        super();

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    get (endpoint: string, params = null): Observable<any> {

        let url = this.createUrl(endpoint);

        if (params) {
            url += '?' + $.param(params);
        }

        this.notifySubscribers(ApiClientService.EV_BEFORE_GET);

        let observable = this.http
            .get(url, this.headers)
            .share();


        observable
            .subscribe((response: any) => {
                this.notifySubscribers(ApiClientService.EV_GET_SUCCESSFUL, JSON.parse(response._body));
            },
            this.handleBackendErrorOnRead.bind(this)
        );

        return observable;
    }


    post(endpoint: string, payload: {}) {

        let url = this.createUrl(endpoint);

        this.notifySubscribers(ApiClientService.EV_BEFORE_PUT);

        let observable = this.http
            .post(url, payload, this.headers)
            .share();

        observable.subscribe((response: any) => {
                this.notifySubscribers(ApiClientService.EV_PUT_SUCCESSFUL);
            },
            this.handleBackendErrorOnRead.bind(this)
        );

        return observable;
    }

    put(endpoint: string, payload: {}) {

        let url = this.createUrl(endpoint);

        this.notifySubscribers(ApiClientService.EV_BEFORE_PUT);

        let observable = this.http
            .put(url, payload, this.headers)
            .share();

        observable.subscribe((response: any) => {
                this.notifySubscribers(ApiClientService.EV_PUT_SUCCESSFUL);
            },
            this.handleBackendErrorOnRead.bind(this)
        );

        return observable;
    }

    private handleBackendErrorOnRead() {
        console.warn('Error');
    }

    private createUrl(endpoint: any): string {
        let url = endpoint;

        if (!environment.production) {
            url = '/api' + url;
        }

        return url;
    }

}
