import { Validators } from '@angular/forms';
import { DynamicFormGroup } from '../../shared/dynamic-forms/builder/dynamic-form-group';
import { DynamicFormControl } from '../../shared/dynamic-forms/builder/dynamic-form-control';
import { DynamicFormValidator } from '../../shared/dynamic-forms/validation/dynamic-form.validator';


export const LAN_FORM = new DynamicFormGroup()
    .elements([
        new DynamicFormGroup('network').elements([
            new DynamicFormGroup('lan')
                .elements([

                    new DynamicFormControl('eth', 'Use Ethernet on LAN')
                        .setControlType(DynamicFormControl.TYPE_CHECKBOX),

                    new DynamicFormControl('ip', 'IP')
                        .setControlType(DynamicFormControl.TYPE_TEXT)
                        .setPlaceholder('000.000.000.000')
                        .setValidators([
                            Validators.required,
                            DynamicFormValidator.IpV4Validator
                        ]),

                    new DynamicFormControl('netmask', 'Netmask')
                        .setControlType(DynamicFormControl.TYPE_TEXT)
                        .setPlaceholder('000.000.000.000')
                        .setValidators([
                            Validators.required,
                            DynamicFormValidator.IpV4Validator
                        ]),

                    new DynamicFormControl('dhcp_range', 'DHCP Range')
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
        ])
    ]);
