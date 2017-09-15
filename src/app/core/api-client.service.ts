import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Entity } from '../shared/entity/entity';
import { environment } from '../../environments/environment';
import { Events } from './events';

declare let $: any;

@Injectable()
export class ApiClientService extends Events {
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

    get(entity: Entity, params = null) {

        let url = this.createUrl(entity);

        if (params) {
            url += '?' + $.param(params);
        }

        this.notifySubscribers(ApiClientService.EV_BEFORE_GET);

        this.http
            .get(url, this.headers)
            .subscribe((response: any) => {
                    this.notifySubscribers(ApiClientService.EV_GET_SUCCESSFUL, JSON.parse(response._body));
                },
                this.handleBackendErrorOnRead.bind(this)
            );
    }


    put(entity: Entity, payload: {}) {

        let url = this.createUrl(entity);

        this.notifySubscribers(ApiClientService.EV_BEFORE_PUT);

        this.http
            .put(url, payload, this.headers)
            .subscribe((response: any) => {
                    this.notifySubscribers(ApiClientService.EV_PUT_SUCCESSFUL);
                },
                this.handleBackendErrorOnRead.bind(this)
            );
    }

    private handleBackendErrorOnRead() {
        console.warn('Error');
    }

    private createUrl(entity: Entity): string {
        let url = entity.endpoint;

        if (!environment.production) {
            url = '/api' + url;
        }

        return url;
    }

}
