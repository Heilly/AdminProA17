import { Routes } from '@angular/router';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';

// import { CountriesComponent } from './countries.component';

export const COUNTRIES_ROUTES: Routes = [
  { path: 'by-capital', component: ByCapitalPageComponent, title: 'By Capital'},
  { path: 'by-country', component: ByCountryPageComponent, title: 'By Country'},
  { path: 'by-region', component: ByRegionPageComponent,title: 'By Region' },
  { path: 'by/:id', component: CountryPageComponent, title: 'Country' },
  { path: '**', redirectTo: 'by-capital' }
];
