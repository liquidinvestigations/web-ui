import { Component, Input } from '@angular/core';

@Component({
    selector: 'li-table-list',
    templateUrl: './table-list.component.html',
    styleUrls: ['./table-list.component.scss']
})
export class TableListComponent {
    @Input() config: {
        title: string,
        fields: {
            label: string,
            value: string,
            cssClass: string,
            error_message: string,
            showAsText: boolean
        }[]
    };

    switchToText(field) {
        field.showAsText = !field.showAsText;
    }

    isPasswordText(field) {
        return field.label.toLowerCase() === 'password';
    }

    showAsBullets(count) {
        return (new Array(count + 1)).join('*');
    }
}
