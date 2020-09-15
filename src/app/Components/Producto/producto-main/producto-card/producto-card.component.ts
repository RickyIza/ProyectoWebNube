import { Component, OnInit,Input, Output ,EventEmitter} from '@angular/core';
import { faIdCard, faTimes, faUser, faCalendar, faMapMarkedAlt, faGenderless, faBackspace } from '@fortawesome/free-solid-svg-icons';
import { ProductoService } from 'src/app/Services/producto.service';
import { Producto } from 'src/app/Models/producto';
import { ImageService } from 'src/app/services/image.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Variable } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-producto-card',
  templateUrl: './producto-card.component.html',
  styleUrls: ['./producto-card.component.css'],
  providers: [ImageService],
})
export class ProductoCardComponent implements OnInit {

  faIdCard = faIdCard;
  faTimes = faTimes;
  faUser = faUser;
  faCalendar = faCalendar;
  faMapMarkedAlt = faMapMarkedAlt;
  faGenderless = faGenderless;
  faBackspace = faBackspace;
  
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
    private activatedRoute: ActivatedRoute,
    private imageService: ImageService,
    private sanitizer: DomSanitizer,
    ) { }

    ngOnInit(): void {
      this.getProductFromService();
    }
    // Obtiene el producto segun la id
    getProductFromService(): void {
      this.activatedRoute.params.subscribe((params) => {
        this.producto = new Producto();
        if (params['id']) {
          this.productoService.retrieve(params['id']).subscribe((result) => {
            (this.producto = result), this.getImageFromService();
          });
        }
      });
    }
    // Obtien la imagen respecto a ese producto
    getImageFromService(): void {
      this.imageService.getProfileImage(this.producto.comentario).subscribe(
        (data: any) => {
          const objectURL = 'data:image/jpeg;base64,' + data;
          this.imageToShow = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  