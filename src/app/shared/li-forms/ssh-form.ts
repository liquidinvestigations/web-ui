import { DynamicFormControl } from '../dynamic-forms/builder/dynamic-form-control';
import { DynamicFormArray } from '../dynamic-forms/builder/dynamic-form-array';
import { DynamicFormGroup } from '../dynamic-forms/builder/dynamic-form-group';

export const SSH_FORM =
    new DynamicFormGroup('ssh')
        .elements([
            new DynamicFormControl('enabled', 'SSH')
                .setFormGroupCssClass('service-group')
                .setControlType(DynamicFormControl.TYPE_SLIDER),

            new DynamicFormArray('authorized_keys')
                .setArrayCssClass('col-xs-12 col-xs-offset-0 col-sm-9 col-sm-offset-2')
                .generateElement(
                    new DynamicFormControl('key')
                        .wrapInGroup()
                        .setRenderer(false)
                        .setControlType(DynamicFormControl.TYPE_TEXT)
                        .setIsRemovable()
                )
                .setIsHidden(
                    true
                )
                .enableInteraction()
                .setMaxElements(5),

        ]);
