import { DynamicFormGroup } from '../../shared/dynamic-forms/builder/dynamic-form-group';
import { DynamicFormControl } from '../../shared/dynamic-forms/builder/dynamic-form-control';

export const SERVICES_FORM = new DynamicFormGroup('services')
    .elements([
        new DynamicFormControl('hoover', 'Hoover')
            .setControlType(DynamicFormControl.TYPE_CHECKBOX),

        new DynamicFormControl('hypothesis', 'Hypothesis')
            .setControlType(DynamicFormControl.TYPE_CHECKBOX),

        new DynamicFormControl('docuwiki', 'DocuWiki')
            .setControlType(DynamicFormControl.TYPE_CHECKBOX),

        new DynamicFormControl('matrix', 'Matrix')
            .setControlType(DynamicFormControl.TYPE_CHECKBOX),

        new DynamicFormControl('davros', 'Davros')
            .setControlType(DynamicFormControl.TYPE_CHECKBOX),
    ]);
