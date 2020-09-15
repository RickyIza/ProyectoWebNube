import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DetallePedido } from 'src/app/Models/detalle-pedido';
import { Pedido } from 'src/app/Models/pedido';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/Models/producto';
import { DetallePedidoService } from 'src/app/Services/detalle-pedido.service';
import { MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { ProductoService } from 'src/app/Services/producto.service';
import {faCheck, faPlusCircle, faPencilAlt, faTrash} from '@fortawesome/free-solid-svg-icons'
import { PedidoService } from 'src/app/Services/pedido.service';

@Component({
  selector: 'app-detalle-pedido-form',
  templateUrl: './detalle-pedido-form.component.html',
  styleUrls: ['./detalle-pedido-form.component.css']
})
export class DetallePedidoFormComponent implements OnInit {

  faPlusCircle = faPlusCircle;
  faTrash = faTrash;

  disponible : string = "D";
  detalle : DetallePedido = new DetallePedido();

  productos : Producto[];
  producto : Producto;
  form : FormGroup;
  //listados que servirán para hacer el carrito
  detallespedido : DetallePedido[] = [];
  nombre : string[] = [];
  
  constructor(private formBuilder: FormBuilder, private productoService : ProductoService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      cantidad: ['',Validators.required],
      subtotal : ['',Validators.required],
      idProducto: ['',Validators.required]
    });
    this.searchProducto();
  }  

  searchProducto() : void {
    this.productoService.search(this.disponible).subscribe(
      result => this.productos = result
    )
  }

  actualizarPrecio(ctrl){
    this.producto = this.productos[ctrl.selectedIndex - 1];
    this.calcularTotal();
  }

  calcularTotal(){
    this.detalle.subtotal = parseFloat(((this.detalle.cantidad * this.producto.precio)).toFixed(2));
  }

  AgregarCarrito(){
    this.detallespedido.push(this.detalle);
    this.AgregarLocalStorage(this.detallespedido);
    this.detalle = new DetallePedido();
  }

  onSubmit(){
    this.AgregarCarrito();
    this.nombre.push(this.producto.nombre);
  }

  AgregarLocalStorage(detalles : DetallePedido[]){
    localStorage.setItem("detalle", JSON.stringify(detalles));
  }

  deleteDetalle(i : number):void{
    this.nombre.splice(i,1);
    this.detallespedido.splice(i,1);
    this.AgregarLocalStorage(this.detallespedido);
  }
}
