import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { appRouterProviders } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { HttpClientService } from './app/services/common/http-client.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    { provide: 'baseUrl', useValue: 'https://localhost:7279/api' },  // Base URL'i buraya ekleyin
    HttpClientService,
    appRouterProviders]
}).catch(err => console.error(err));
