import { Pipe, PipeTransform } from '@angular/core';
import { Tipo } from '../../../interfaces';
import { environment } from '../../../environments/environment.dev';

@Pipe({ name: 'appImagenpipe', standalone: true })
export class ImagenpipePipe implements PipeTransform {

  private base_url = environment.baseUrl;

  public transform(img : string, tipo: Tipo): string {

    if(!img){
      return `${ this.base_url }/upload/${tipo}/no-image`;
    } else {
      return `${ this.base_url }/upload/${tipo}/${ img }`;
    }
  }


}
