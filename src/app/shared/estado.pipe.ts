import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estado'
})
export class EstadoPipe implements PipeTransform {

  transform(value: string): string {
    if(value === "D")
      return "Disponible";
    if(value === "A")
      return "Agotado";
  }

}
