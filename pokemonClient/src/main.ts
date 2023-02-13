import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import userReducer from './app/slices/user-slice';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes), HttpClientModule),
    provideStore({
      user: userReducer,
    }),
    provideStoreDevtools(),
  ],
});
