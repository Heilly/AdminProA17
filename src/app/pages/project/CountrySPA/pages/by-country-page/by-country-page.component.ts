import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { SearchboxComponent } from '../../componentes/searchbox/searchbox.component';
import { CountryTableComponent } from '../../componentes/country-table/country-table.component';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  standalone: true,
  imports: [CommonModule, SearchboxComponent, CountryTableComponent],
})
export class ByCountryPageComponent  implements OnInit {

  public countries: Country[] = [];
  public initialValue: string = '';

  constructor( private countriesService: CountriesService ) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountries.countries;
    this.initialValue = this.countriesService.cacheStore.byCountries.term;
  }

  searchByCountry( term: string ):void  {
    this.countriesService.searchCountry( term )
      .subscribe( countries => {
        this.countries = countries;
      });

  }
}
