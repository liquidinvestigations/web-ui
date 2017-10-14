import { Validators } from '@angular/forms';
import { DynamicFormValidator } from '../dynamic-forms/validation/dynamic-form.validator';

export const USERNAME_REGEX = /^([a-zA-Z0-9_]|\.)+$/i;
export const DOMAIN_REGEX = /^(([a-zA-Z0-9_]|-)+\.)+([a-zA-Z0-9_]+)$/i;

export const USERNAME_VALIDATOR_RULES = [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(64),
    DynamicFormValidator.regexValidator(
        USERNAME_REGEX,
        'Username has to be alpha-numeric'
    )
];

export const PASSWORD_VALIDATOR_RULES = [
    Validators.required,
    Validators.minLength(8)
];