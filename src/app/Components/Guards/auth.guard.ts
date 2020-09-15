import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private authService: AuthService, private router: Router){}

  canActivate(next: ActivatedRouteSnapshot): boolean {
    if(this.authService.isAuthenticated()) {

      let roles = next.data['permittedRoles'] as Array<string>;      
      if(roles){
        let result = this.authService.hasRole(roles);
        if(!result)
        {
          Swal.fire({
            icon: 'error',
            title: 'Acceso denegado',
            text: "403 No esta autorizado"
          });                    
        }              
        return result;        
      }
      return true;
    }  
    Swal.fire({
      title : "Usuario no autenticado",
      text : '401 Se debe autenticar para acceder',
      icon : 'error'
    });
    this.router.navigateByUrl('/ingresar');
    return false;
  }
  
}

