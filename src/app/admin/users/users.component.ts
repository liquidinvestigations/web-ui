import { Component, ViewChild } from '@angular/core';
import { ApiClientService } from '../../core/api-client.service';
import { BsModalComponent } from '../../shared/bs-modal/bs-modal.component';
import { DynamicFormGroup } from '../../shared/dynamic-forms/builder/dynamic-form-group';
import { DynamicFormControl } from '../../shared/dynamic-forms/builder/dynamic-form-control';
import { Validators } from '@angular/forms';
import { PASSWORD_VALIDATOR_RULES, USERNAME_VALIDATOR_RULES } from '../../shared/li-forms/validators.regex';

@Component({
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent {
    @ViewChild('editModal') editModalComponent: BsModalComponent;
    @ViewChild('changePasswordModal') changePasswordModalComponent: BsModalComponent;

    editFormConfig: DynamicFormGroup;

    changePasswordFormConfig: DynamicFormGroup;

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

    isAddMode: boolean = false;

    constructor(private apiService: ApiClientService) {
        this.getUserList();

        this.setDefaultEditForm();

        this.changePasswordFormConfig = new DynamicFormGroup()
            .elements([
                new DynamicFormControl('username')
                    .setFormGroupCssClass('hidden')
                    .setControlType(DynamicFormControl.TYPE_HIDDEN),

                new DynamicFormControl('new_password', 'Password')
                    .setLabelCssClass('col-xs-12 col-sm-3 text-right')
                    .setControlCssClass('col-xs-12 col-sm-7')
                    .setControlType(DynamicFormControl.TYPE_PASSWORD)
                    .setValidators(PASSWORD_VALIDATOR_RULES)
                    .setEnableTextToggle()
            ]);
    }

    setDefaultEditForm() {

        let passwordField = new DynamicFormControl('new_password', 'Password')
            .setLabelCssClass('col-xs-12 col-sm-3 text-right')
            .setControlCssClass('col-xs-12 col-sm-7')
            .setControlType(DynamicFormControl.TYPE_PASSWORD)
            .setDividerBottom('row')
            .setEnableTextToggle()
            .setVisibleIf(() => {
                passwordField.updateValueAndValidity({onlySelf: false, emitEvent: false});

                if (this.isAddMode) {
                    passwordField.setValidators(PASSWORD_VALIDATOR_RULES);
                } else {
                    passwordField.setValidators(null);
                }
                return this.isAddMode;
            });

        this.editFormConfig = new DynamicFormGroup()
            .elements([
                new DynamicFormControl('username', 'Username')
                    .setLabelCssClass('col-xs-12 col-sm-3 text-right')
                    .setControlCssClass('col-xs-12 col-sm-7')
                    .setControlType(DynamicFormControl.TYPE_TEXT)
                    .setValidators(USERNAME_VALIDATOR_RULES),

                passwordField,

                new DynamicFormControl('is_admin', 'Admin')
                    .setLabelCssClass('col-xs-12 col-sm-3 text-right')
                    .setControlCssClass('col-xs-12 col-sm-7')
                    .setValue(false, { emitEvent: false })
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

                new DynamicFormControl('is_active', '')
                    .setLabelCssClass('col-xs-12 col-sm-3 text-right')
                    .setControlCssClass('col-xs-12 col-sm-7')
                    .setFormGroupCssClass('hidden')
                    .setValue(true, { emitEvent: false })
                    .setControlType(DynamicFormControl.TYPE_HIDDEN),

            ]);
    }

    isBoolean(value: any) {
        return typeof value === 'boolean';
    }

    getUserList() {
        this.apiService
            .get('/api/users/')
            .subscribe((users: any[]) => {
                this.users[0].entries = [];
                this.users[1].entries = [];

                for (let user of users) {
                    user.name = user.first_name + ' ' + user.last_name;

                    if (user.is_active) {
                        this.users[0].entries.push(user);
                    } else {
                        this.users[1].entries.push(user);
                    }
                }
            });
    }

    toggleActiveUser(username: string, isActive: boolean) {
        this.apiService
            .put('/api/users/' + username + '/active/', {is_active: isActive})
            .subscribe(() => {
                this.getUserList();
            });
    }

    showEditUserModal(user?: {}) {

        this.setDefaultEditForm();

        if (user) {
            this.isAddMode = false;
            this.editFormConfig.patchValue(user, {emitEvent: false});
            this.editFormConfig.controls['username'].disable({emitEvent: false});
        } else {
            this.isAddMode = true;
            this.editFormConfig.controls['username'].enable({emitEvent: false});
        }

        this.editModalComponent.show();
    }

    updateUserData(formValues, create: boolean = false) {
        this.editModalComponent.hide();

        if (create) {

            let username = formValues.username;
            let password = formValues.new_password;
            delete formValues.new_password;

            this.apiService
                .post('/api/users/', formValues)
                .subscribe(() => {
                    this.changePassword({
                        username: username,
                        new_password: password
                    }, this.getUserList.bind(this));
                });

        } else {
            let username = formValues.username;
            delete formValues.new_password;

            this.apiService
                .put('/api/users/' + username + '/', formValues)
                .subscribe(() => {
                    this.getUserList();
                });
        }
    }

    showChangePasswordModal(user) {
        this.changePasswordFormConfig.reset();
        this.changePasswordFormConfig.patchValue(user, {emitEvent: false});
        this.changePasswordModalComponent.show();
    }

    changePassword(formValues, callback) {
        this.changePasswordModalComponent.hide();

        let username = formValues.username;
        delete formValues.username;

        this.apiService
            .post('/api/users/' + username + '/password/', formValues)
            .subscribe(callback);
    }


}
