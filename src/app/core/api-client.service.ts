import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LiEvents } from './li-events';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

import { CookieService } from 'ngx-cookie-service';

declare let $: any;
declare let window: any;

@Injectable()
export class ApiClientService extends LiEvents {
    static readonly EV_BEFORE_GET = 'before_read';
    static readonly EV_GET_SUCCESSFUL = 'get_successful';

    static readonly EV_BEFORE_PUT = 'before_put';
    static readonly EV_PUT_SUCCESSFUL = 'put_successful';

    static readonly EV_BEFORE_POST = 'before_post';
    static readonly EV_POST_SUCCESSFUL = 'post_successful';

    static readonly EV_API_ERROR = 'api_error';

    static readonly EV_POLLING_CUD_STARTED = 'api_polling_cud_started';
    static readonly EV_POLLING_CUD_STOPPED = 'api_polling_cud_stopped';
    static readonly EV_POLLING_STATUS = 'api_polling_status';
    static readonly EV_POLLING_ERROR = 'api_polling_error';

    static readonly POLLING_INTERVAL = 1000;

    private headers: Headers;

    constructor(private http: Http,
                private cookieService: CookieService) {
        super();

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    get(endpoint: string | string[], params = null): Observable<any> {

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
                        .get(url, new RequestOptions({headers: this.headers}))
                        .map(res => res.json())
                        .share()
                );
            }

            observable = Observable.forkJoin.apply(null, requests);
        } else {
            observable = this.http
                .get(url, new RequestOptions({headers: this.headers}))
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

    post(endpoint: string, payload: {} = {}, useLongPolling: boolean = true) {

        let url = this.createUrl(endpoint);

        this.notifySubscribers(ApiClientService.EV_BEFORE_POST);

        let observable = this.http
            .post(url, payload, new RequestOptions({headers: this.headers}))
            .share();

        return this.longPolling(observable, useLongPolling)
            .do((response: any) => {
                    this.notifySubscribers(ApiClientService.EV_POST_SUCCESSFUL, response);
                },
                this.handleBackendErrorOnRead.bind(this)
            );
    }

    put(endpoint: string, payload: {} = {}, useLongPolling: boolean = true) {

        let url = this.createUrl(endpoint);

        this.notifySubscribers(ApiClientService.EV_BEFORE_PUT);

        let observable = this.http
            .put(url, payload, new RequestOptions({headers: this.headers}))
            .share();

        return this.longPolling(observable, useLongPolling)
            .do((response: any) => {
                    this.notifySubscribers(ApiClientService.EV_PUT_SUCCESSFUL, response);
                },
                this.handleBackendErrorOnRead.bind(this)
            );
    }

    upload(endpoint, type: string, payload: any) {
        let headers = new Headers();
        headers.append('Content-Type', type);
        let csrfCookie = this.cookieService.get('csrftoken');

        if (csrfCookie) {
            headers.set('X-CSRFToken', csrfCookie);
        }

        let url = this.createUrl(endpoint);

        this.notifySubscribers(ApiClientService.EV_BEFORE_POST);

        let observable = this.http
            .post(url, payload, new RequestOptions({headers: headers}))
            .share();

        return observable.do((response: any) => {
                this.notifySubscribers(ApiClientService.EV_POST_SUCCESSFUL, response);
            },
            this.handleBackendErrorOnRead.bind(this)
        );
    }

    private handleBackendErrorOnRead(error: any) {

        if (error.status === 403) {
            window.location = '/accounts/login/?next=' + window.location.pathname;
        }

        let errObject: {};
        try {
            errObject = error.json();
        } catch (e) {
            errObject = {};
        }

        this.notifySubscribers(ApiClientService.EV_API_ERROR, errObject);
    }

    private createUrl(endpoint: any): string {
        this.setCSRFHeader();
        return endpoint;
    }

    setCSRFHeader() {
        let csrfCookie = this.cookieService.get('csrftoken');

        if (csrfCookie) {
            this.headers.set('X-CSRFToken', csrfCookie);
        }
    }

    private longPolling(request: Observable<any>, useLongPolling: boolean = false) {
        if (!useLongPolling) {
            return request;
        }

        return request
            .switchMap(
                (requestValue) => {
                    this.notifySubscribers(ApiClientService.EV_POLLING_CUD_STARTED);

                    let timer = this.infinitePolling();

                    return timer
                        .skipUntil(timer.filter(data => data && data.status === 'ok'))
                        .take(1)
                        .map(() => requestValue)
                        .do(() => {
                            this.notifySubscribers(ApiClientService.EV_POLLING_CUD_STOPPED);
                        }, () => {
                            this.notifySubscribers(ApiClientService.EV_POLLING_ERROR);
                        });
                }
            );
    }

    infinitePolling() {
        let timer = Observable.timer(0, ApiClientService.POLLING_INTERVAL);

        return Observable.race(
            timer
                .switchMap(() => this.http.get('/api/configure/status/'))
                .map((data) => data.json()),

            timer.switchMap(
                () => Observable.of(0).delay(ApiClientService.POLLING_INTERVAL + 1)
            )
        )
            .skipWhile((data) => {
                return data && data.status !== 'configuring';
            })
            .share()
            .do((data) => {
                this.notifySubscribers(ApiClientService.EV_POLLING_STATUS, data);
            })

            .retryWhen(errors => errors.delay(ApiClientService.POLLING_INTERVAL));
    }
}
