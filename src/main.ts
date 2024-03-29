import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.routes'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from 'environments/environment';
import { enableProdMode } from '@angular/core';

if (environment.production) {
  enableProdMode()
}


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES, withComponentInputBinding()),
    provideAnimations(),
    provideHttpClient(
      withInterceptorsFromDi(),
    ), provideAnimationsAsync(),
  ],
}).catch(err => console.error(err))
