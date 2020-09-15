import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../Models/usuario';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { ObserveOnSubscriber } from 'rxjs/internal/operators/observeOn';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url : string = "http://slndeliveryback-001-site1.btempurl.com/api/Usuarios";

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',
      'Accept' : 'application/json'
    })
  };

  constructor(private http : HttpClient) { }

  save( u : Usuario) : Observable<any> {
    let usuarioBody = JSON.stringify(u);
    if(u.idUsuario === undefined){
      return this.http.post<any>(this.url, usuarioBody,this.httpOptions);
    }
    return this.http.put<any>(this.url, usuarioBody,this.httpOptions);
  } 

  retrieve(id : number) : Observable<Usuario> {
    return this.http.get<Usuario>(this.url + "/" + id,this.httpOptions);
  }

  delete(u : Usuario) : Observable<any> {
    return this.http.delete<any>(this.url + "/" + u.idUsuario, this.httpOptions);
  }

  list(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.url, this.httpOptions);
  }

  search(criteria:string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url.concat("?criteria=").concat(criteria), this.httpOptions);
  } 
}
