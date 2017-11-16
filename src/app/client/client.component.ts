import { Component } from '@angular/core';
import { ApiClientService } from '../core/api-client.service';

declare let window: any;

@Component({
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss']
})
export class ClientComponent {
    pages = [
        {
            subdomain: 'hypothesis',
            label: 'Hypothesis',
            icon: './assets/liquid-investigations/img/dummy.svg',
        },
        {
            subdomain: 'hoover',
            label: 'Hoover',
            icon: './assets/liquid-investigations/img/dummy.svg',
        },
        {
            subdomain: 'dokuwiki',
            label: 'DokuWiki',
            icon: './assets/liquid-investigations/img/dummy.svg',
        },
        {
            subdomain: 'davros',
            label: 'Davros',
            icon: './assets/liquid-investigations/img/dummy.svg',
        },
        {
            subdomain: 'matrix',
            label: 'Matrix',
            icon: './assets/liquid-investigations/img/dummy.svg',
        }
    ];

    protocol = window.location.protocol;

    hostname = window.location.hostname;

    username: string = '';
    isAdmin: boolean = false;

    constructor(apiService: ApiClientService) {
        apiService.get('/api/users/whoami/')
            .subscribe((data) => {

                if (! data.is_authenticated) {
                    window.location = '/accounts/login/?next=' + window.location.pathname;
                }

                this.username = data.username;
                this.isAdmin = data.is_admin;
            });
    }
}
