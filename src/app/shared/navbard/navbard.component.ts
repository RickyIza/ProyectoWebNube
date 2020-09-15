import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DetallePedido } from 'src/app/Models/detalle-pedido';
import { Pedido } from 'src/app/Models/pedido';
import { Usuario } from 'src/app/Models/usuario';
import {faCheck, faPlusCircle, faPencilAlt, faBackspace} from '@fortawesome/free-solid-svg-icons'
import { PedidoService } from 'src/app/Services/pedido.service';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { DetallePedidoService } from 'src/app/Services/detalle-pedido.service';
import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert2';
import { ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-navbard',
  templateUrl: './navbard.component.html',
  styleUrls: ['./navbard.component.css']

})
export class NavbardComponent implements OnInit {

  faCheck = faCheck;
  faPlusCircle = faPlusCircle;
  faPencilAlt = faPencilAlt;
  faBackspace = faBackspace;
  form: FormGroup;  
  submitted: boolean = false;
  detalle : DetallePedido;
  pedido : Pedido = new Pedido();
  detalles : DetallePedido[] = [];
  usuario : Usuario;
  id:number;


  constructor(
    private detalleService: DetallePedidoService,
    private pedidoService : PedidoService, 
    private usuarioService : UsuarioService, 
    private formBuilder: FormBuilder, 
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {

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

}
