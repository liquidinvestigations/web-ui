import { FormControl } from '@angular/forms';

export class DynamicFormValidator {

    static getValidatorMessage(errorName: string, error?: any) {

        if (error.customMessage) {
            return error.customMessage;
        } else {
            let errorMessages = {
                'required': 'This field is required'
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


}
