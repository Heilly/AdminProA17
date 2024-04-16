import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchboxComponent } from '../../componentes/searchbox/searchbox.component';
import { CountryTableComponent } from '../../componentes/country-table/country-table.component';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { LoadingSpinnerComponent } from '../../componentes/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  standalone: true,
  imports: [CommonModule, SearchboxComponent, CountryTableComponent, LoadingSpinnerComponent],
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor( private countriesService: CountriesService ) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }

  searchByCapital( term: string ):void  {

    this.isLoading = true;

    this.countriesService.searchCapital( term )
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      });

  }

}
