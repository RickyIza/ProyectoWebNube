import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Producto } from '../Models/producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  
  url : string = "http://slndeliveryback-001-site1.btempurl.com/api/Productos";

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',
      'Accept' : 'application/json'
    })
  };

  constructor(private http : HttpClient) { }

  //guarda los productos en la base de datos que vienen del componente producto form
  save( p : Producto) : Observable<any> {
    let productoBody = JSON.stringify(p);
    if(p.idProducto === undefined){
      return this.http.post<any>(this.url, productoBody,this.httpOptions);
    }
    return this.http.put<any>(this.url, productoBody,this.httpOptions);
  } 
  
  //recupera un producto mediante un id específico que viene del component producto list
  retrieve(id : number) : Observable<Producto> {
    return this.http.get<Producto>(this.url + "/" + id,this.httpOptions);
  }
  //elimina un producto mediante el id que recibe del component producto list
  delete(p : Producto) : Observable<any> {
    return this.http.delete<any>(this.url + "/" + p.idProducto, this.httpOptions);
  }

  //recupera todos los productos que se encuentran en la base de datos
  list(): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.url, this.httpOptions);
  }

  //recupera solo los productos marcados como disponibles en la base de datos
  search(criteria:string): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url.concat("?criteria=").concat(criteria), this.httpOptions);
  }

  update(p: Producto): Observable<any>{
    const productoBody = JSON.stringify(p);
    console.log(p);
    return this.http.put<any>(this.url, p, this.httpOptions);
  }
}
