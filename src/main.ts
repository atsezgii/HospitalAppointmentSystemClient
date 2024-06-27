import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { appRouterProviders } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { HttpClientService } from './app/services/common/http-client.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthService } from './app/features/auth/services/auth.service';
import { authGuard } from './app/guards/auth.guard';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    { provide: 'baseUrl', useValue: 'https://localhost:7144/api' },  // Base URL'i buraya ekleyin
    HttpClientService,
    appRouterProviders, provideAnimationsAsync(),
    AuthService]
}).catch(err => console.error(err));
