import { AbstractControl, Form, FormControl } from '@angular/forms';

export class DynamicFormValidator {

    static getValidatorMessage(errorName: string, error?: any) {

        if (error.customMessage) {
            return error.customMessage;
        } else {
            let errorMessages = {
                'required': 'This field is required',
                'minlength': 'You need to enter more than %s characters'
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
            let password = AC.get(field1).value;
            let confirmPassword = AC.get(field2).value;

            if (password !== confirmPassword) {
                AC.get(field2).setErrors( {
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
