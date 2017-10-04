import { Component, ViewChild } from '@angular/core';
import { ApiClientService } from '../../core/api-client.service';
import { BsModalComponent } from '../../shared/bs-modal/bs-modal.component';
import { DynamicFormGroup } from '../../shared/dynamic-forms/builder/dynamic-form-group';
import { DynamicFormControl } from '../../shared/dynamic-forms/builder/dynamic-form-control';
import { Validators } from '@angular/forms';

@Component({
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent {
    @ViewChild(BsModalComponent) modalComponent: BsModalComponent;

    dynamicFormConfig: DynamicFormGroup;

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


    users = [
        {
            title: 'Active users',
            entries: []
        },
        {
            title: 'Inactive users',
            entries: []
        }
    ];

    currentUsername: string = '';

    constructor(private apiService: ApiClientService) {
        this.getUserList();

        this.dynamicFormConfig = new DynamicFormGroup()
            .elements([

                new DynamicFormControl('is_admin', 'Admin')
                    .setLabelCssClass('col-xs-12 col-sm-3 text-right')
                    .setControlCssClass('col-xs-12 col-sm-7')
                    .setControlType(DynamicFormControl.TYPE_SLIDER),

                new DynamicFormControl('first_name', 'First name')
                    .setLabelCssClass('col-xs-12 col-sm-3 text-right')
                    .setControlCssClass('col-xs-12 col-sm-7')
                    .setControlType(DynamicFormControl.TYPE_TEXT)
                    .setValidators([Validators.required]),

                new DynamicFormControl('last_name', 'Last name')
                    .setLabelCssClass('col-xs-12 col-sm-3 text-right')
                    .setControlCssClass('col-xs-12 col-sm-7')
                    .setControlType(DynamicFormControl.TYPE_TEXT)
                    .setValidators([Validators.required]),

                new DynamicFormControl('is_active', 'Active')
                    .setLabelCssClass('col-xs-12 col-sm-3 text-right')
                    .setControlCssClass('col-xs-12 col-sm-7')
                    .setControlType(DynamicFormControl.TYPE_SLIDER),

            ]);
    }

    getUserList() {

        this.users[0].entries = [];
        this.users[1].entries = [];

        this.apiService
            .get('/api/users')
            .map(res => res.json())
            .subscribe((users: any[]) => {
                for (let user of users) {

                    // user.is_admin = user.is_admin ? 'admin' : 'user';

                    if (user.is_active) {
                        this.users[0].entries.push(user);
                    } else {
                        this.users[1].entries.push(user);
                    }
                }
            });
    }

    toggleUser(username: string, isActive: boolean) {
        this.apiService
            .put('/api/users/' + username + '/active', {is_active: isActive})
            .subscribe(() => {
                this.getUserList();
            });
    }

    editUser(user) {
        this.currentUsername = user.username;
        this.dynamicFormConfig.patchValue(user, {emitEvent: false});
        this.modalComponent.show();
    }

    updateUserData(formValues) {
        this.modalComponent.hide();
        this.apiService
            .put('/api/users/' + this.currentUsername, formValues)
            .subscribe(() => {
                this.getUserList();
            });
    }

}
