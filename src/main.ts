import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { AuthService } from './app/features/auth/services/auth.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpClientService } from './app/services/common/http-client.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appRouterProviders } from './app/app.routes';
import { jwtInterceptor } from './app/interceptors/token.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([jwtInterceptor])),

    { provide: 'baseUrl', useValue: 'https://localhost:44317/api' },  // Add the base URL here
    { provide: appConfig, useValue: 'https://localhost:44317/api' },
    HttpClientService,
    appRouterProviders,
    provideAnimations(),
    AuthService
  ]
}).catch(err => console.error(err));
