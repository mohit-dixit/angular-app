import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppConfigService } from './services/app-config.service';
import { httpRequestInterceptor } from './services/interceptor/http-request-interceptor.interceptor';
import { authInterceptor } from './services/interceptor/auth.interceptor';

function initializeApp(configService: AppConfigService) {
  return () => configService.loadConfig();
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(
      withInterceptors([httpRequestInterceptor, authInterceptor])
    ),
    AppConfigService,
      {
        provide: APP_INITIALIZER,
        useFactory: initializeApp,
        deps: [AppConfigService],
        multi: true
    }]
};
