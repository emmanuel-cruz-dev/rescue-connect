import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HTTP_INTERCEPTORS, withInterceptorsFromDi } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import { MessageService } from 'primeng/api';
import Aura from '@primeuix/themes/aura';

import { routes } from './app.routes';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),

    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.dark-mode',
        },
      },
    }),

    MessageService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
};
