import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.routes'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES, withComponentInputBinding()),
    provideAnimations(),
    provideHttpClient(
      withInterceptorsFromDi(),
    ),
  ],
}).catch(err => console.error(err))
