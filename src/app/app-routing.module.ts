import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioMainComponent } from 'src/app/Components/Usuario/usuario-main/usuario-main.component';
import { UsuarioCardComponent } from 'src/app/Components/Usuario/usuario-main/usuario-card/usuario-card.component';
import { UsuarioFormComponent } from './Components/Usuario/usuario-main/usuario-form/usuario-form.component';
import { ProductoMainComponent } from './Components/Producto/producto-main/producto-main.component';
import { ProductoCardComponent } from './Components/Producto/producto-main/producto-card/producto-card.component';
import { ProductoFormComponent } from './Components/Producto/producto-main/producto-form/producto-form.component';

import { ProductoEditComponent } from './Components/Producto/producto-main/producto-edit/producto-edit.component';
import { CabeceraPedidoFormComponent } from './Components/Pedido/cabecera-pedido-form/cabecera-pedido-form.component';
import { DetallePedidoFormComponent } from './Components/DetallePedido/detalle-pedido-main/detalle-pedido-form/detalle-pedido-form.component';
import { ReportComponent } from './Components/report/report.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthGuard } from './Components/Guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'usuarios', component: UsuarioMainComponent,canActivate : [AuthGuard], data:{permittedRoles:["A"]}},
  {path: 'usuarios/:id', component: UsuarioCardComponent,canActivate : [AuthGuard], data:{permittedRoles:["A"]}},
  {path: 'usuario/form', component: UsuarioFormComponent,canActivate : [AuthGuard], data:{permittedRoles:["A"]}},
  {path: 'usuario/form/:id', component: UsuarioFormComponent,canActivate : [AuthGuard], data:{permittedRoles:["A"]}},
  {path: 'productos', component: ProductoMainComponent,canActivate : [AuthGuard], data:{permittedRoles:["A"]}},
  {path: 'productos/:id', component: ProductoCardComponent,canActivate : [AuthGuard], data:{permittedRoles:["A","C"]}},
  {path: 'producto/form', component: ProductoFormComponent,canActivate : [AuthGuard], data:{permittedRoles:["A"]}},
  {path: 'producto/form/:id', component: ProductoFormComponent,canActivate : [AuthGuard], data:{permittedRoles:["A","C"]}},
  {path: 'producto/update/:id',component: ProductoEditComponent,canActivate : [AuthGuard], data:{permittedRoles:["A"]}},
  {path: 'cabecera', component: CabeceraPedidoFormComponent,canActivate : [AuthGuard], data:{permittedRoles:["A","C"]}},
  {path: 'detalle', component: DetallePedidoFormComponent,canActivate : [AuthGuard], data:{permittedRoles:["A","C"]}},
  {path: 'reportes', component: ReportComponent,canActivate : [AuthGuard], data:{permittedRoles:["A"]}},
  {path: 'ingresar', component: LoginFormComponent},
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
