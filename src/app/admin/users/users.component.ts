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
            name: 'name',
            label: 'Name'
        },
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

    isAddMode: boolean;

    constructor(private apiService: ApiClientService) {
        this.getUserList();

        let passwordField = new DynamicFormControl('password', 'Password')
            .setLabelCssClass('col-xs-12 col-sm-3 text-right')
            .setControlCssClass('col-xs-12 col-sm-7')
            .setControlType(DynamicFormControl.TYPE_PASSWORD)
            .setDividerBottom('row')
            .setEnableTextToggle()
            .setVisibleIf(() => {
                passwordField.updateValueAndValidity({onlySelf: false, emitEvent: false});

                if (this.isAddMode) {
                    passwordField.setValidators([Validators.required]);
                } else {
                    passwordField.setValidators(null);
                }
                return this.isAddMode;
            });


        this.dynamicFormConfig = new DynamicFormGroup()
            .elements([
                new DynamicFormControl('username', 'Username')
                    .setLabelCssClass('col-xs-12 col-sm-3 text-right')
                    .setControlCssClass('col-xs-12 col-sm-7')
                    .setControlType(DynamicFormControl.TYPE_TEXT)
                    .setValidators([Validators.required]),

                passwordField,

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
            .get('/api/users/')
            .subscribe((users: any[]) => {
                for (let user of users) {

                    // user.is_admin = user.is_admin ? 'admin' : 'user';

                    user.name = user.first_name + ' ' + user.last_name;

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
            .put('/api/users/' + username + '/active/', {is_active: isActive})
            .subscribe(() => {
                this.getUserList();
            });
    }

    editUser(user) {
        if (user) {
            this.isAddMode = false;
            this.dynamicFormConfig.patchValue(user, {emitEvent: false});
            this.dynamicFormConfig.controls['username'].disable({emitEvent: false});
        } else {
            this.isAddMode = true;
            this.dynamicFormConfig.reset();
            this.dynamicFormConfig.controls['username'].enable({emitEvent: false});
        }

        this.modalComponent.show();
    }

    updateUserData(formValues, create: boolean = false) {
        this.modalComponent.hide();

        if (create) {
            this.apiService
                .post('/api/users/', formValues)
                .subscribe(() => {
                    this.getUserList();
                });
        } else {
            let username = formValues.username;
            delete formValues.username;

            this.apiService
                .put('/api/users/' + username + '/', formValues)
                .subscribe(() => {
                    this.getUserList();
                });
        }
    }

}
