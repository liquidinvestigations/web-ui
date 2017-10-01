import { Component } from '@angular/core';
import { ApiClientService } from '../../core/api-client.service';

@Component({
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent {

    tableColumns = [
        {
            name: 'username',
            label: 'Username'
        },
        {
            name: 'is_admin',
            label: 'Role'
        },
        {
            name: 'first_name',
            label: 'First name'
        },
        {
            name: 'last_name',
            label: 'Last name'
        }
    ];


    users = [];

    constructor(private apiService: ApiClientService) {
        this.apiService
            .get('/api/users')
            .map(res => res.json())
            .subscribe((data) => {
                this.users = data;
            });
    }

}
