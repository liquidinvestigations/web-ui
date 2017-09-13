import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ApiClientService } from './api-client.service';

@NgModule({
    imports: [
        HttpModule,
    ],
    declarations: [],
    providers: [
        ApiClientService
    ]
})
export class CoreModule {}
