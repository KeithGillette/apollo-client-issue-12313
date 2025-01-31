import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {APOLLO_OPTIONS, provideApollo} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';

import {routes} from './app.routes';
import {createApollo} from './graphql-client';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideApollo(createApollo)
  ]
};
