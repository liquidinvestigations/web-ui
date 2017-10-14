import { Validators } from '@angular/forms';
import { DynamicFormGroup } from '../dynamic-forms/builder/dynamic-form-group';
import { DynamicFormControl } from '../dynamic-forms/builder/dynamic-form-control';
import { DynamicFormValidator } from '../dynamic-forms/validation/dynamic-form.validator';

export const WAN_FORM = new DynamicFormGroup()
    .elements([
        new DynamicFormGroup('wan')
            .elements([

                new DynamicFormGroup('wifi')
                    .elements([
                        new DynamicFormControl('ssid', 'SSID')
                            .setControlType(DynamicFormControl.TYPE_TEXT)
                            .setPlaceholder('your network name')
                            .setValidators([
                                Validators.required,
                                Validators.minLength(1),
                                Validators.maxLength(31),
                            ]),

                        new DynamicFormControl('password', 'Password')
                            .setControlType(DynamicFormControl.TYPE_PASSWORD)
                            .setPlaceholder('your network password')
                            .setEnableTextToggle()
                            .setValidators([
                                Validators.required,
                                Validators.minLength(8),
                                Validators.maxLength(63),
                            ]),
                    ]),

                new DynamicFormControl('dhcp', 'DHCP')
                    .setDividerTop()
                    .setControlType(DynamicFormControl.TYPE_SLIDER)
                    .setValue(true)
                    .onChange((value, formGroup: DynamicFormControl, parentGroup: DynamicFormGroup) => {
                        if (value) {
                            parentGroup.controls['static'].disable({emitEvent: false});
                        } else {
                            parentGroup.controls['static'].enable({emitEvent: false});
                        }

                    }),

                new DynamicFormGroup('static')
                    .elements([
                        new DynamicFormControl('ip', 'IP')
                            .setControlType(DynamicFormControl.TYPE_TEXT)
                            .setPlaceholder('000.000.000.000')
                            .setValue('192.168.66.66', {emitEvent: false})
                            .setValidators([
                                Validators.required,
                                DynamicFormValidator.IpV4Validator
                            ]),

                        new DynamicFormControl('netmask', 'Netmask')
                            .setControlType(DynamicFormControl.TYPE_TEXT)
                            .setPlaceholder('000.000.000.000')
                            .setValue('255.255.255.0', {emitEvent: false})
                            .setValidators([
                                Validators.required,
                                DynamicFormValidator.IpV4Validator
                            ]),

                        new DynamicFormControl('gateway', 'Gateway')
                            .setControlType(DynamicFormControl.TYPE_TEXT)
                            .setPlaceholder('000.000.000.000')
                            .setValue('192.168.66.1', {emitEvent: false})
                            .setValidators([
                                Validators.required,
                                DynamicFormValidator.IpV4Validator
                            ]),

                        new DynamicFormControl('dns_server', 'DNS Server')
                            .setControlType(DynamicFormControl.TYPE_TEXT)
                            .setPlaceholder('000.000.000.000')
                            .setValue('192.168.66.1', {emitEvent: false})
                            .setValidators([
                                Validators.required,
                                DynamicFormValidator.IpV4Validator
                            ]),

                    ]),

            ])

    ]);
