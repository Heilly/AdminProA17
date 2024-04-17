import { LOCALE_ID } from '@angular/core';

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

//Configuracion de locale de la app
import localEsHN from '@angular/common/locales/es-HN';
import localFrCa from '@angular/common/locales/fr-CA';
import {registerLocaleData} from '@angular/common';
registerLocaleData(localEsHN);
registerLocaleData(localFrCa );


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'es-HN' }, //Idioma global
  ]
};
