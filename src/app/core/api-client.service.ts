import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LiEvents } from './li-events';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import { CookieService } from 'ngx-cookie-service';

declare let $: any;

@Injectable()
export class ApiClientService extends LiEvents {
    static readonly EV_BEFORE_GET = 'before_read';
    static readonly EV_GET_SUCCESSFUL = 'get_successful';

    static readonly EV_BEFORE_PUT = 'before_put';
    static readonly EV_PUT_SUCCESSFUL = 'put_successful';

    static readonly EV_BEFORE_POST = 'before_post';
    static readonly EV_POST_SUCCESSFUL = 'post_successful';

    static readonly EV_API_ERROR = 'api_error';

    private headers: Headers;

    constructor(
        private http: Http,
        private cookieService: CookieService
    ) {
        super();

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    get (endpoint: string | string[], params = null): Observable<any> {

        let url = this.createUrl(endpoint);

        if (params) {
            url += '?' + $.param(params);
        }

        this.notifySubscribers(ApiClientService.EV_BEFORE_GET);
        let observable;

        if (endpoint instanceof Array) {
            let requests = [];
            for (url of endpoint) {
                requests.push(
                    this.http
                        .get(url, this.headers)
                        .map(res => res.json())
                        .share()
                );
            }

            observable = Observable.forkJoin.apply(null, requests);
        } else {
            observable = this.http
                .get(url, this.headers)
                .map(res => res.json())
                .share();
        }

        return observable
            .do((response: any) => {
                    this.notifySubscribers(ApiClientService.EV_GET_SUCCESSFUL, response);
                },
                this.handleBackendErrorOnRead.bind(this)
            );
    }


    post(endpoint: string, payload: {}) {

        let url = this.createUrl(endpoint);

        this.notifySubscribers(ApiClientService.EV_BEFORE_POST);

        let observable = this.http
            .post(url, payload, this.headers)
            .share();

        return observable.do((response: any) => {
                this.notifySubscribers(ApiClientService.EV_POST_SUCCESSFUL, response);
            },
            this.handleBackendErrorOnRead.bind(this)
        );
    }

    put(endpoint: string, payload: {}) {

        let url = this.createUrl(endpoint);

        this.notifySubscribers(ApiClientService.EV_BEFORE_PUT);

        let observable = this.http
            .put(url, payload, this.headers)
            .share();

        return observable.do((response: any) => {
                this.notifySubscribers(ApiClientService.EV_PUT_SUCCESSFUL, response);
            },
            this.handleBackendErrorOnRead.bind(this)
        );
    }

    private handleBackendErrorOnRead() {
        this.notifySubscribers(ApiClientService.EV_API_ERROR);
    }

    private createUrl(endpoint: any): string {
        this.setCSRFHeader();
        return endpoint;
    }

    setCSRFHeader() {
        this.headers.delete('csrftoken');

        let csrfCookie = this.cookieService.get('csrftoken');

        if (csrfCookie) {
            this.headers.append('HTTP-X-CSRF-TOKEN', csrfCookie);
        }
    }

}
