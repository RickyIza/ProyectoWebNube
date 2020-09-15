import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { faUserPlus, faIdCard, faSave, faTimes, faUser, faCalendar, faMapMarkedAlt, faGenderless } from '@fortawesome/free-solid-svg-icons';
import { Usuario } from 'src/app/Models/usuario';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  faUserPlus =faUserPlus;
  faIdCard = faIdCard;
  faSave = faSave;
  faTimes = faTimes;
  faUser = faUser;
  faCalendar = faCalendar;
  faMapMarkedAlt = faMapMarkedAlt;
  faGenderless = faGenderless;

  form: FormGroup;  
  submitted: boolean = false;

  usuario : Usuario;
  title: string = "Nuevo Usuario";
  @Output() flagToReload = new EventEmitter<Boolean>();

  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  constructor(private usuarioService : UsuarioService, private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,private router: Router) { }

  ngOnInit() : void {
    this.usuario = new Usuario();
    this.form = this.formBuilder.group({
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      correo: ['', [Validators.required, Validators.pattern(this.emailPattern)]],      
      usuariosesion: ['', Validators.required],      
      contrasena: ['', Validators.required],      
      rol: ['', Validators.required]      
    });

    this.activatedRoute.params.subscribe(
      params => {
        if(params['id']){
          this.usuarioService.retrieve(params['id']).subscribe(
            result => {
              this.usuario = result;
              this.title = "Editando: " + this.usuario.nombre +" " + this.usuario.apellido;
            }
          )
        }
      }
    );
  }

  onSubmit() : void {

    this.submitted = true;

    if(this.form.invalid){
      console.error('Error en formulario');
      return;
    }

    this.usuarioService.save(this.usuario).subscribe(
      result => {
        this.submitted = false;
        this.usuario = new Usuario();
        console.log(result);
        this.router.navigate(['usuarios']);
      }
    );

    swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Usuario: '+ this.usuario.nombre + " " + this.usuario.apellido +' guardado correctamente',
      showConfirmButton: false,
      timer: 1500
    })
  }

  get cedula(){return this.form.get('cedula');}
  get nombre(){return this.form.get('nombre');}
  get apellido(){return this.form.get('apellido');}
  get telefono(){return this.form.get('telefono');}
  get direccion(){return this.form.get('direccion');}
  get correo(){return this.form.get('correo');}
  get usuariosesion(){return this.form.get('usuariosesion');}
  get contrasena(){return this.form.get('contrasena');}

  onReset() : void {
    swal.fire({
      title: '¿Estas seguro que desea continuar?',
      text: "No se guardarán los cambios realizados.",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) =>{
      if(result.value){
        this.router.navigate(['usuarios']);
      }
    })
  }

}
