import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReporteVentas } from '../Models/reporte-ventas';

@Injectable({
  providedIn: 'root'
})
export class ReporteVentasService {

  url : string = "http://slndeliveryback-001-site1.btempurl.com/api/Reportes";
  url2 : string = "http://slndeliveryback-001-site1.btempurl.com/api/VentasUsuarios";

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',
      'Accept' : 'application/json'
    })
  };

  constructor(private http : HttpClient) { }

  list(): Observable<any>{
    return this.http.get<any>(this.url, this.httpOptions);
  }

  listVentas(): Observable<any>{
    return this.http.get<any>(this.url2, this.httpOptions);
  }
}
