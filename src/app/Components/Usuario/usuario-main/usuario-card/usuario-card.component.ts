import { Component, OnInit } from '@angular/core';
import { faIdCard, faTimes, faUser, faCalendar, faMapMarkedAlt, faGenderless, faPhoneAlt, faEnvelope, faBackspace } from '@fortawesome/free-solid-svg-icons';
import { Usuario } from 'src/app/Models/usuario';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario-card',
  templateUrl: './usuario-card.component.html',
  styleUrls: ['./usuario-card.component.css']
})
export class UsuarioCardComponent implements OnInit {

  faIdCard = faIdCard;
  faTimes = faTimes;
  faUser = faUser;
  faCalendar = faCalendar;
  faMapMarkedAlt = faMapMarkedAlt;
  faGenderless = faGenderless;
  faPhoneAlt = faPhoneAlt;
  faEnvelope = faEnvelope;
  faBackspace = faBackspace;

  usuario : Usuario;

  constructor(private usuarioService : UsuarioService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.usuario = new Usuario();
    this.activatedRoute.params.subscribe(
      params => {
        if(params['id']){
          this.usuarioService.retrieve(params['id']).subscribe(
            result => this.usuario = result
          )
        }
      }
    );
  }

}
