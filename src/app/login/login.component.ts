import { Component, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { BsModalComponent } from '../shared/bs-modal/bs-modal.component';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    @ViewChild('loginModal') loginModal: BsModalComponent;

    csrf = '';
    redirect = '';

    constructor(
        private route: ActivatedRoute,
        private cookieService: CookieService
    ) {
        let redirect = this.route.snapshot.paramMap.get('redirect');

        this.redirect = redirect ? redirect : '/client';

        this.csrf = this.cookieService.get('csrftoken');
    }

    ngOnInit() {
        this.loginModal.show(true);
    }
}
