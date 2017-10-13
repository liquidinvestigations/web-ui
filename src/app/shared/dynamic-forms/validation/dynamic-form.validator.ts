import { AbstractControl, FormControl } from '@angular/forms';
import { DynamicFormControl } from '../builder/dynamic-form-control';

export class DynamicFormValidator {

    static getValidatorMessage(errorName: string, error?: any) {

        if (error.customMessage) {
            return error.customMessage;
        } else {
            let errorMessages = {
                'required': 'This field is required',
                'minlength': 'You need to enter more than %s characters'
                    .replace('%s', error['requiredLength']),

                'maxlength': 'You need to enter less than %s characters'
                    .replace('%s', error['requiredLength']),

                'invalidIPv4': 'You must enter a valid IPv4',
                'invalidIPv4Range': 'You must enter a valid IPv4 range',
                'invalidHostname': 'Hostname is invalid',
            };

            return (errorName in errorMessages)
                ? errorMessages[errorName]
                : null;
        }

    }

    static regexValidator(regex: RegExp, message: string = '') {
        return (input: FormControl) => {
            if (!input.value || regex.test(input.value)) {
                return null;
            }
            return {
                'invalidRegex': {
                    customMessage: message
                }
            };
        };
    }

    static hostnameValidator(input: FormControl) {
        let ipV4Regex = /^(?!\-)(?:\*\.)?(?:[a-zA-Z\d\-]{0,62}[a-zA-Z\d]\.){1,126}(?!\d+)[a-zA-Z-\d]{2,63}$/i;
        if (!input.value || ipV4Regex.test(input.value)) {
            return null;
        }

        return {
            invalidHostname: true
        };
    }

    static IpV4Validator(input: FormControl) {
        let ipV4Regex = /^(?=.*[^\.]$)((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.?){4}$/;
        if (!input.value || ipV4Regex.test(input.value)) {
            return null;
        }

        return {
            invalidIPv4: true
        };
    }


    static IpV4RangeValidator(input: FormControl) {
        let ipV4RangeRegex = /^(?=.*[^\.]$)((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.?){4}\-(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if (!input.value || ipV4RangeRegex.test(input.value)) {
            return null;
        }

        return {
            invalidIPv4Range: true
        };
    }

    static FieldMatch(field1, field2, message = '') {

        return (AC: AbstractControl) => {

            let field1Control = AC.get(field1) as DynamicFormControl;
            let field2Control = AC.get(field2) as DynamicFormControl;

            let value1 = field1Control.value;
            let value2 = field2Control.value;

            if (!message) {
                message = "'%f2' should match '%f1'"
                    .replace('%f2', field2Control.label)
                    .replace('%f1', field1Control.label);
            }

            if (value1 !== value2) {
                field2Control.setErrors( {
                    'fieldsMatch' : {
                        customMessage: message
                    }
                });
            } else {
                return null;
            }
        };
    }


}
