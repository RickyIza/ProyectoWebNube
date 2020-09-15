import { Component, OnInit, Input, Output ,EventEmitter} from '@angular/core';
import { faUserPlus, faIdCard, faSave, faTimes, faUser, faCalendar, faMapMarkedAlt, faGenderless } from '@fortawesome/free-solid-svg-icons';
import { Producto } from 'src/app/Models/producto';
import { ProductoService } from 'src/app/Services/producto.service';
import { ImageService } from 'src/app/services/image.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import swal from 'sweetalert2';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css'],
  providers: [ImageService],
})
export class ProductoFormComponent implements OnInit 
{

  faUserPlus =faUserPlus;
  faIdCard = faIdCard;
  faSave = faSave;
  faTimes = faTimes;
  faUser = faUser;
  faCalendar = faCalendar;
  faMapMarkedAlt = faMapMarkedAlt;
  faGenderless = faGenderless;
  image: Variable;
  caption: Variable;
  @Input() producto: Producto;
  @Input() title: string;
  @Output() flagToReload = new EventEmitter<boolean>();
  formJuego: FormGroup;
  submitted = false;
  imageUrl = '/assets/img/juego.png';
  fileToUpload: File = null;

  base64data: string;
  imageToShow: any = '/assets/img/juego.png';
  cambio = false;
  lastImagen: string;

  constructor(
    private productoService : ProductoService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private imageService: ImageService,
    private sanitizer: DomSanitizer,
    
    ) { }

  ngOnInit() {
    this.producto = new Producto();
    this.formJuego = this.formBuilder.group({ 
      nombre : ['', Validators.required],
      precio : ['', Validators.required],
      comentario : ['', Validators.required],
      estado : ['', Validators.required],
      fechaelaboracion : [''],
      fechavencimiento : ['']  
    });

    this.activatedRoute.params.subscribe(
      params => {
        if(params['id']){
          this.productoService.retrieve(params['id']).subscribe(
            result => {
              this.producto = result;
              this.title = "Actualizando el registro de " + this.producto.nombre;
            }
          )
        }
      }
    );
  }

  get f(): any {
    return this.formJuego.controls;
  }
  public register(): void {
    const user = this.formJuego.value;
    console.log(user);
  }


  onSubmit() : void 
{

  this.submitted = true;

  if(this.formJuego.invalid){
    console.error('Error en formulario');
    return;
  }

   this.imageService
      .postFile(this.producto.nombre, this.fileToUpload)
      .subscribe((data) => {
        this.producto.comentario = data;
        this.productoService.save(this.producto).subscribe((result) => {
          this.submitted = false;
          this.flagToReload.emit(true);
          this.router.navigate(['productos']);
        });
      });
  

  swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Producto: '+ this.producto.nombre + ' guardado correctamente',
    showConfirmButton: false,
    timer: 1500
  })
}

get nombre(){return this.formJuego.get('nombre');}
get precio(){return this.formJuego.get('precio');}
get comentario(){return this.formJuego.get('comentario');}

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
    this.submitted = false;
    this.formJuego.reset();
    this.imageUrl = '/assets/img/juego.png';
    this.producto = new Producto();
    this.router.navigate(['productos']);
    }
  })
}

handleFileInput(file: FileList): void {
  this.fileToUpload = file.item(0);
  // Show image preview
  const reader = new FileReader();
  reader.onload = (event: any) => {
    this.imageUrl = event.target.result;
  };
  reader.readAsDataURL(this.fileToUpload);
}
  // Obtiene el producto segun la id
  getProductFromService(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.producto = new Producto();
        if (params['id']) {
          this.productoService.retrieve(params['id']).subscribe((result) => {
            (this.producto = result), this.getImageFromService();
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  // Obtiene la imagen respecto a ese producto
  getImageFromService(): void {
    this.imageService.getProfileImage(this.producto.comentario).subscribe(
      (data: any) => {
        const objectURL = 'data:image/jpeg;base64,' + data;
        this.imageToShow = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        // Guarda el nombre de la imagen anterior si hay cambio
        this.lastImagen = this.producto.comentario;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
