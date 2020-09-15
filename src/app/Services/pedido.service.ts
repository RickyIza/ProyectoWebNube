import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../Models/pedido';
import { DetallePedido } from '../Models/detalle-pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService { 
  
  url : string = "http://slndeliveryback-001-site1.btempurl.com/api/Pedido";
  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',
      'Accept' : 'application/json'
    })
  };

  constructor(private http : HttpClient) { }

  save(p:Pedido) : Observable<any> {
    let pedidoBody = JSON.stringify(p);
    console.log(pedidoBody);
    return this.http.post<any>(this.url, pedidoBody,this.httpOptions);
  } 

  retrieve(id : number) : Observable<Pedido> {
    return this.http.get<Pedido>(this.url + "/" + id,this.httpOptions);
  }

  //elimina un producto mediante el id que recibe del component producto list
  delete(p : Pedido) : Observable<any> {
    return this.http.delete<any>(this.url + "/" + p.idPedido, this.httpOptions);
  }

  //recupera todos los productos que se encuentran en la base de datos
  list(): Observable<Pedido[]>{
    return this.http.get<Pedido[]>(this.url, this.httpOptions);
  }
}
