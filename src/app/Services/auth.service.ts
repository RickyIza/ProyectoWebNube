import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  url : string = "http://slndeliveryback-001-site1.btempurl.com/api/login";
  
  //https://localhost:44324/api/Productos
  //url : string = "https://localhost:44344/api/login";
  userToken : string = "";
  
  httpOptions={
    headers:new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'      
    })
  };

  constructor(private http:HttpClient) { }

  login(usuariosesion:string, contrasena:string) : Observable<any> {
    let userBody = JSON.stringify({ "usuariosesion" : usuariosesion , "contrasena" : contrasena });    
    return this.http.post<any>(this.url.concat('/authenticate'), userBody, this.httpOptions).pipe(
      map( resp => {
        localStorage.setItem('user', resp.user.usuariosesion);
        localStorage.setItem('role', resp.user.rol);
        localStorage.setItem('id', resp.user.idUsuario);
        this.saveToken(resp.token);        
        return resp;        
      })
    );    
  }

  private saveToken( idToken: string ) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    let now = new Date();
    now.setSeconds(600);
    localStorage.setItem('duration', now.getTime().toString() );
  }

  isAuthenticated(): boolean {
    if (this.userToken.length < 2 ) {
      return false;
    }
    const expira = Number(localStorage.getItem('duration'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if ( expiraDate > new Date() ) {
      return true;
    } else {
      this.logout();
      return false;
    }
  }

  hasRole(allowedRoles : Array<string>): boolean {    
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));    
    var userRole = payLoad.rol;
    console.log(userRole);
    return allowedRoles.indexOf(userRole) !== -1;
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('duration');
  }

  getIdUsuario():number{  
    var id = localStorage.getItem('id');
    return parseInt(id);
  }
}
