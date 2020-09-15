import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rol'
})
export class RolPipe implements PipeTransform {

  transform(value: string): string {
    if(value === "C")
      return "Cliente";
    if(value === "A")
      return "Administrador";
  }

}
