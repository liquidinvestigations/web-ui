import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './static/404/not-found.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        CoreModule,
        SharedModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        NotFoundComponent,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
