import { Component, OnInit } from '@angular/core';
import { AdminEntity } from '../admin.entity';

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

    constructor(private adminEntity: AdminEntity) {
        adminEntity.requestUserDetails()
            .subscribe((data) => {
                this.users = data;
            });

    }

}
