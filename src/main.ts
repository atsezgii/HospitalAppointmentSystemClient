import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { AuthService } from './app/features/auth/services/auth.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpClientService } from './app/services/common/http-client.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appRouterProviders } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    { provide: 'baseUrl', useValue: 'https://localhost:7144/api' },  // Add the base URL here
    HttpClientService,
    appRouterProviders,
    provideAnimations(),
    AuthService
  ]
}).catch(err => console.error(err));
