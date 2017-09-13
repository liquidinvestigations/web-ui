import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Entity } from '../shared/entity/entity';
import { environment } from '../../environments/environment';

declare let $: any;

@Injectable()
export class ApiClientService {
    static readonly EV_GET_SUCCESSFUL = 'get_successful';
    static readonly EV_BEFORE_GET = 'before_read';

    protected eventListeners: {
        [key: string]: ((response: any) => void)[]
    } = {};

    private headers: Headers;

    constructor(private http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    get (entity: Entity, params = null) {

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

    public subscribe(event: string, listener: (data: any) => void): number {
        if (undefined === this.eventListeners[event]) {
            this.eventListeners[event] = [];
        }

        return this.eventListeners[event].push(listener) - 1;
    }

    public unsubscribe(event: string, index: number): void {
        if (this.eventListeners[event]
            && this.eventListeners[event][index]) {
            this.eventListeners[event].splice(index, 1);
        }
    }

    public notifySubscribers(event: string, data: any = null): void {
        if (event in this.eventListeners && undefined !== this.eventListeners[event]) {
            for (let listener of
                this.eventListeners[event]) {
                listener(data);
            }
        }
    }
}
