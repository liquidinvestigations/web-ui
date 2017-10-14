import { Validators } from '@angular/forms';
import { DynamicFormGroup } from '../dynamic-forms/builder/dynamic-form-group';
import { DynamicFormControl } from '../dynamic-forms/builder/dynamic-form-control';
import { DynamicFormValidator } from '../dynamic-forms/validation/dynamic-form.validator';

export const LAN_FORM = new DynamicFormGroup()
    .elements([
        new DynamicFormGroup('lan')
            .elements([

                new DynamicFormGroup('hotspot')
                    .elements([
                        new DynamicFormControl('ssid', 'SSID')
                            .setControlType(DynamicFormControl.TYPE_TEXT)
                            .setValidators([
                                Validators.required,
                                Validators.minLength(1),
                                Validators.maxLength(31),
                            ]),

                        new DynamicFormControl('password', 'Password')
                            .setControlType(DynamicFormControl.TYPE_TEXT)
                            .setValidators([
                                Validators.required,
                                Validators.minLength(8),
                                Validators.maxLength(63),
                            ]),
                    ]),

                new DynamicFormControl('ip', 'IP')
                    .setFormGroupCssClass('row')
                    .setControlType(DynamicFormControl.TYPE_TEXT)
                    .setPlaceholder('000.000.000.000')
                    .setValue('10.0.0.1', {emitEvent: false})
                    .setDividerTop('row')
                    .setValidators([
                        Validators.required,
                        DynamicFormValidator.IpV4Validator
                    ]),

                new DynamicFormControl('netmask', 'Netmask')
                    .setFormGroupCssClass('row')
                    .setControlType(DynamicFormControl.TYPE_TEXT)
                    .setPlaceholder('000.000.000.000')
                    .setValue('255.255.255.0', {emitEvent: false})
                    .setValidators([
                        Validators.required,
                        DynamicFormValidator.IpV4Validator
                    ]),

                new DynamicFormControl('dhcp_range', 'DHCP Range')
                    .setFormGroupCssClass('row')
                    .setControlType(DynamicFormControl.TYPE_TEXT)
                    .setPlaceholder('000.000.000.000-200')
                    .setValue('10.0.0.100-200', {emitEvent: false})
                    .setValidators([
                        Validators.required,
                        DynamicFormValidator.IpV4RangeValidator
                    ]),

                new DynamicFormControl('eth', 'Use Ethernet on LAN')
                    .setControlType(DynamicFormControl.TYPE_SLIDER),
            ])
    ]);
