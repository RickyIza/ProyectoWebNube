import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetallePedido } from 'src/app/Models/detalle-pedido';

@Injectable({
  providedIn: 'root'
})
export class DetallePedidoService {
  
  url : string = "http://slndeliveryback-001-site1.btempurl.com/api/DetallePedido";
  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',
      'Accept' : 'application/json'
    })
  };

  constructor(private http : HttpClient) { }

  save(dp : DetallePedido) : Observable<any> {
    let detallepedidoBody = JSON.stringify(dp);
    console.log(detallepedidoBody);
    if(dp.idDetPedido === undefined){
      return this.http.post<any>(this.url, detallepedidoBody,this.httpOptions);
    }
  } 
}
