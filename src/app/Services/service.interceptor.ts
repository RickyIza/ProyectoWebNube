import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse  
} from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do'
import Swal from 'sweetalert2';

@Injectable()
export class ServiceInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, response: HttpHandler): Observable<HttpEvent<unknown>> {
    return response.handle(request).do(next => {
      if(next instanceof HttpResponse){
        console.info(next);
        if(next.status === 201)
        {          
          Swal.fire({
            title : "¡Correcto!",
            text : next.body,
            icon : "success"
          });
        }        
        /*if(next.status === 200)
        { 
          Swal.fire({
            title : "¡Correcto!",
            text : next.body,
            icon : "success"
          });
        }*/
      }
    }, error => {
      console.error(error);
      if(error.status === 400)
        {          
          Swal.fire({
            title : "Error",
            text :error.error.Message,
            icon : "error"
          });
        }     
        if(error.status === 0)
        {          
          Swal.fire({
            title : "Error",
            text :error.message,
            icon : "error"
          });
        }     
    });
  }
}
