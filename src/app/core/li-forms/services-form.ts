import { DynamicFormGroup } from '../../shared/dynamic-forms/builder/dynamic-form-group';
import { DynamicFormControl } from '../../shared/dynamic-forms/builder/dynamic-form-control';

export const SERVICES_FORM = new DynamicFormGroup('services')
    .elements([
        new DynamicFormControl('hoover', 'Hoover')
            .setFormGroupCssClass('service-group')
            .setControlType(DynamicFormControl.TYPE_SLIDER),

        new DynamicFormControl('hypothesis', 'Hypothesis')
            .setFormGroupCssClass('service-group')
            .setControlType(DynamicFormControl.TYPE_SLIDER),

        new DynamicFormControl('docuwiki', 'DocuWiki')
            .setFormGroupCssClass('service-group')
            .setControlType(DynamicFormControl.TYPE_SLIDER),

        new DynamicFormControl('matrix', 'Matrix')
            .setFormGroupCssClass('service-group')
            .setControlType(DynamicFormControl.TYPE_SLIDER),

        new DynamicFormControl('davros', 'Davros')
            .setFormGroupCssClass('service-group')
            .setControlType(DynamicFormControl.TYPE_SLIDER),
    ]);
