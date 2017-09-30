import { Validators } from '@angular/forms';
import { DynamicFormGroup } from '../dynamic-forms/builder/dynamic-form-group';
import { DynamicFormControl } from '../dynamic-forms/builder/dynamic-form-control';
import { DynamicFormValidator } from '../dynamic-forms/validation/dynamic-form.validator';


export const LAN_FORM = new DynamicFormGroup()
    .elements([
        new DynamicFormGroup('lan')
            .elements([

                new DynamicFormControl('eth', 'Use Ethernet on LAN')
                    .setControlType(DynamicFormControl.TYPE_SLIDER),

                new DynamicFormControl('ip', 'IP')
                    .setFormGroupCssClass('row')
                    .setControlType(DynamicFormControl.TYPE_TEXT)
                    .setPlaceholder('000.000.000.000')
                    .setValidators([
                        Validators.required,
                        DynamicFormValidator.IpV4Validator
                    ]),

                new DynamicFormControl('netmask', 'Netmask')
                    .setFormGroupCssClass('row')
                    .setControlType(DynamicFormControl.TYPE_TEXT)
                    .setPlaceholder('000.000.000.000')
                    .setValidators([
                        Validators.required,
                        DynamicFormValidator.IpV4Validator
                    ]),

                new DynamicFormControl('dhcp_range', 'DHCP Range')
                    .setFormGroupCssClass('row')
                    .setControlType(DynamicFormControl.TYPE_TEXT)
                    .setPlaceholder('000.000.000.000-255')
                    .setValidators([
                        Validators.required
                    ]),

                new DynamicFormGroup('hotspot')
                    .elements([
                        new DynamicFormControl('ssid', 'SSID')
                            .setControlType(DynamicFormControl.TYPE_TEXT)
                            .setPlaceholder('SSID')
                            .setValidators([
                                Validators.required
                            ]),

                        new DynamicFormControl('password', 'Password')
                            .setControlType(DynamicFormControl.TYPE_PASSWORD)
                            .setEnableTextToggle()
                            .setValidators([
                                Validators.required
                            ]),
                    ])

            ])
    ]);
