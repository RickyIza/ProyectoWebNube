import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/Models/producto';
import { ProductoService } from 'src/app/Services/producto.service';
import { faListAlt, faEye, faPencilAlt, faTrash, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import swal from 'sweetalert2';


@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css']
})
export class ProductoListComponent implements OnInit {

  faListAlt = faListAlt;
  faEye = faEye;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  faPlusSquare=faPlusSquare;

  productos : Producto[];

  constructor(private productoService : ProductoService) { }

  ngOnInit() {
    this.list();
  }

  list() : void{
    this.productoService.list().subscribe(result => {
      this.productos = result;
    });
  }

  delete(p : Producto) : void{
    swal.fire({
      title: '¿Estas seguro que desea continuar?',
      text: "El Producto: " + p.nombre + " será eliminado.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) =>{
      if(result.value){
        this.productoService.delete(p).subscribe(
          result => {
          console.log(result)
          this.list();
          }
        )
      }
    })
  }
}
