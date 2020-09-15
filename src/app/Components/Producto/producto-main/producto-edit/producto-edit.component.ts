import { Component, OnInit, Input, Output ,EventEmitter} from '@angular/core';
import {  faUser, faMapMarkedAlt, faGenderless } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus, faListAlt, faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import {faDollarSign, faRuler, faPager, faSave, faTimes, faPlus, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faIdCard, faTag, faAlignJustify, faGripVertical, faImage, faList,faCalendar} from '@fortawesome/free-solid-svg-icons';

import { Producto } from 'src/app/Models/producto';
import { ProductoService } from 'src/app/Services/producto.service';
import { ImageService } from 'src/app/services/image.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import swal from 'sweetalert2';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.component.html',
  styleUrls: ['./producto-edit.component.css'],
  providers: [ImageService],
})
export class ProductoEditComponent implements OnInit {
  faUserPlus = faUserPlus;
  faCalendar =faCalendar;
  faListAlt = faListAlt;
  faEye = faEye;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  aPlus = faPlus;
  faTimes = faTimes;
  faSave = faSave;
  faIdCard = faIdCard;
  faTag = faTag;
  faAlignJustify = faAlignJustify;
  faGripVertical = faGripVertical;
  faImage = faImage;
  faDollarSign = faDollarSign;
  faRuler = faRuler;
  faPager = faPager;
  faCartPlus = faCartPlus;
  faList = faList;
  image: Variable;
  caption: Variable;
  @Input() producto: Producto;
  @Input() title: string;
  @Output() flagToReload = new EventEmitter<boolean>();

  public formJuego: FormGroup;
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

  ngOnInit() 
  {

    this.producto = new Producto();
    this.formJuego = this.formBuilder.group(
    { 
      nombre : ['', Validators.required],
      precio : ['', Validators.required],
      comentario : ['', Validators.required],
      estado : ['', Validators.required],
      fechaelaboracion : [''],
      fechavencimiento : ['']  
    });

  }
  public register(): void {
    const user = this.formJuego.value;
    console.log(user);
  }
  onSubmit(image): void {
    this.submitted = true;
    if (this.formJuego.invalid) {
      console.error('Error en formulario');
      swal
        .fire({
          title: 'Error en el formulario',
          text: 'El formulario debe contener todos los datos',
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
        })
        .then((result) => {
          if (result.value) {
            return;
          }
        });
      return;
    }
    console.log(this.producto);
    // Si la Imagen Cambió
    if (this.cambio) {
      console.log(this.cambio);
      console.log(this.lastImagen);
      // Elimino el archivo
      this.imageService.deleteFile(this.lastImagen).subscribe(
        (data) => {
          // Subo la imagen
          this.imageService
            .postFile(this.producto.nombre, this.fileToUpload)
            .subscribe((data2) => {
              this.producto.comentario = data2;
              console.log(data2);
              // Actualizo el producto
              this.productoService.update(this.producto).subscribe((result) => {
                this.submitted = false;
                console.log(result);
                this.flagToReload.emit(true);
              });
            });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log(this.cambio);
      // Actualizo el producto
      this.productoService.update(this.producto).subscribe((result) => {
        this.submitted = false;
        console.log(result);
        this.flagToReload.emit(true);
      });
    }
  }
  onReset(): void {
    this.submitted = false;
    this.formJuego.reset();
    this.producto = new Producto();
  }
  handleFileInput(file: FileList): void {
    this.fileToUpload = file.item(0);
    // Show image preview
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageToShow = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
    this.cambio = true;
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

