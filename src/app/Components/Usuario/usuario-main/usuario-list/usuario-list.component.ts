import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Models/usuario';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { faListAlt, faEye, faPencilAlt, faTrash ,faPlusSquare} from '@fortawesome/free-solid-svg-icons'
import swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {

  faListAlt = faListAlt;
  faEye = faEye;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  faPlusSquare=faPlusSquare;

  usuarios : Usuario[];

  constructor(private usuarioService : UsuarioService) { }

  ngOnInit() {
    this.list();
  }

  list() : void{
    this.usuarioService.list().subscribe(result => {
      this.usuarios = result;
    });
  }

  delete(u : Usuario) : void{
    swal.fire({
      title: '¿Estas seguro que desea continuar?',
      text: "El registro de " + u.nombre + " " + u.apellido + " será eliminado.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) =>{
      if(result.value){
        this.usuarioService.delete(u).subscribe(
          result => {console.log(result)
          this.list();
        }
        ) 
      }
    })
  }

}
