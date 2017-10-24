import { DynamicFormGroup } from '../dynamic-forms/builder/dynamic-form-group';
import { DynamicFormControl } from '../dynamic-forms/builder/dynamic-form-control';

export const SERVICES_FORM = function (installedServices: {} = {}) {

    let serviceControls = {
        hoover: new DynamicFormControl('hoover', 'Hoover')
            .setFormGroupCssClass('service-group')
            .addViewInfo({
                description: 'Search Tool'
            })
            .setControlType(DynamicFormControl.TYPE_SLIDER),

        hypothesis: new DynamicFormControl('hypothesis', 'Hypothesis')
            .setFormGroupCssClass('service-group')
            .addViewInfo({
                description: 'Annotations'
            })
            .setControlType(DynamicFormControl.TYPE_SLIDER),

        dokuwiki: new DynamicFormControl('dokuwiki', 'DokuWiki')
            .setFormGroupCssClass('service-group')
            .addViewInfo({
                description: 'Wiki'
            })
            .setControlType(DynamicFormControl.TYPE_SLIDER),

        matrix: new DynamicFormControl('matrix', 'Matrix')
            .setFormGroupCssClass('service-group')
            .addViewInfo({
                description: 'Chat'
            })
            .setControlType(DynamicFormControl.TYPE_SLIDER),

        davros: new DynamicFormControl('davros', 'Davros')
            .setFormGroupCssClass('service-group')
            .addViewInfo({
                description: 'File Sharing'
            })
            .setControlType(DynamicFormControl.TYPE_SLIDER),
    };

    let elements = [];

    for (let name in installedServices) {
        if (installedServices.hasOwnProperty(name)) {
            elements.push(
                serviceControls[name]
            );
        }
    }

    return new DynamicFormGroup('services')
        .elements(elements);
};
