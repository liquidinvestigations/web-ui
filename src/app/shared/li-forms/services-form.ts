import { DynamicFormGroup } from '../dynamic-forms/builder/dynamic-form-group';
import { DynamicFormControl } from '../dynamic-forms/builder/dynamic-form-control';

export const SERVICES_FORM = function (installedServices: {} = {}) {

    let serviceControls = {
        hoover: new DynamicFormControl('hoover', 'Hoover')
            .setFormGroupCssClass('service-group')
            .setControlType(DynamicFormControl.TYPE_SLIDER),

        hypothesis: new DynamicFormControl('hypothesis', 'Hypothesis')
            .setFormGroupCssClass('service-group')
            .setControlType(DynamicFormControl.TYPE_SLIDER),

        docuwiki: new DynamicFormControl('docuwiki', 'DocuWiki')
            .setFormGroupCssClass('service-group')
            .setControlType(DynamicFormControl.TYPE_SLIDER),

        matrix: new DynamicFormControl('matrix', 'Matrix')
            .setFormGroupCssClass('service-group')
            .setControlType(DynamicFormControl.TYPE_SLIDER),

        davros: new DynamicFormControl('davros', 'Davros')
            .setFormGroupCssClass('service-group')
            .setControlType(DynamicFormControl.TYPE_SLIDER),
    };

    let elements = [];

    for (let name in installedServices) {
        elements.push(
            serviceControls[name]
        );
    }

    return new DynamicFormGroup('services')
        .elements(elements);
};
