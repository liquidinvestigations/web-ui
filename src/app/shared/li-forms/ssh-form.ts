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
                .setArrayCssClass('col-xs-12')
                .generateElement(
                    new DynamicFormControl('key')
                        .setControlCssClass('col-xs-12')
                        .wrapInGroup()
                        .setRenderer(false)
                        .setControlType(DynamicFormControl.TYPE_TEXTAREA)
                        .setIsRemovable()
                )
                .setIsHidden(
                    true
                )
                .enableInteraction()
                .setMaxElements(5),

        ]);
