import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PedidoService } from 'src/app/Services/pedido.service';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { Pedido } from 'src/app/Models/pedido';
import { Usuario } from 'src/app/Models/usuario';
import { ActivatedRoute,Router } from '@angular/router';
import {faCheck, faPlusCircle, faPencilAlt, faBackspace} from '@fortawesome/free-solid-svg-icons'
import { DetallePedido } from 'src/app/Models/detalle-pedido';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DetallePedidoFormComponent } from '../../DetallePedido/detalle-pedido-main/detalle-pedido-form/detalle-pedido-form.component';
import { ProductoService } from 'src/app/Services/producto.service';
import { Producto } from 'src/app/Models/producto';
import { DetallePedidoService } from 'src/app/Services/detalle-pedido.service';
import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-cabecera-pedido-form',
  templateUrl: './cabecera-pedido-form.component.html',
  styleUrls: ['./cabecera-pedido-form.component.css']
})
export class CabeceraPedidoFormComponent implements OnInit {

  faCheck = faCheck;
  faPlusCircle = faPlusCircle;
  faPencilAlt = faPencilAlt;
  faBackspace = faBackspace;

  pedido : Pedido = new Pedido();
  detalles : DetallePedido[] = [];
  usuario : Usuario;
  id:number;

  form: FormGroup;  
  submitted: boolean = false;

  constructor(private detalleService: DetallePedidoService,
    private pedidoService : PedidoService, 
    private usuarioService : UsuarioService, 
    private formBuilder: FormBuilder, 
    private router: Router,
    private auth: AuthService) { 
      this.getLocalStorage();
      this.calcularTotal();
    }

  ngOnInit() {
    this.form = this.formBuilder.group({
      idUsuario:  ['',Validators.required],
      estadopedido: ['',Validators.required],
      total: ['',Validators.required]
    }); 
  }

  onSubmit() : void {
    this.submitted = true;

    if(this.form.invalid){
      console.error('Error en formulario');
      return;
    }

    this.pedidoService.save(this.pedido).subscribe(result => {
        this.pedido = new Pedido();
        console.log(result);
        swal.fire({
          text : "Se creo el pedido ",
          icon : 'success'

        });
        this.router.navigate(['detalle']);
    });

    /*this.pedidoService.save(this.pedido).subscribe(result => {
      console.log(result);
      this.usuario = new Usuario(); 
      //this.pedido.detalle = [];     
    });*/
   
  }

  searchUsuario() : void {
    this.usuarioService.retrieve(this.id).subscribe(
      result => this.usuario = result
    )
  }

  selectUsuario(id : number):void{
    this.pedido.idUsuario = id;
  }
  

  getLocalStorage(){
    this.detalles = JSON.parse(localStorage.getItem("detalle"));
    this.id = parseInt(localStorage.getItem("id"));
    this.pedido.idUsuario = this.id;
    this.pedido.DetallePedido = this.detalles;
    this.searchUsuario();
  }

  calcularTotal(){
    this.detalles.forEach(element => {
      this.pedido.total = this.pedido.total + element.subtotal   
      this.pedido.total = parseFloat(this.pedido.total.toFixed(2));  
    }); 
  }


  /*calcularTotal():void{
    this.pedido.total = this.pedido.detalle.reduce((prev, curr) => {
      return prev + curr.subtotal;
    },0); 
    this.pedido.total = parseFloat(this.pedido.total.toFixed(2));
  }*/
}
