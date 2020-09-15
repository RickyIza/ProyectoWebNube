import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioCarrritoMainComponent } from './usuario-carrrito-main.component';

describe('UsuarioCarrritoMainComponent', () => {
  let component: UsuarioCarrritoMainComponent;
  let fixture: ComponentFixture<UsuarioCarrritoMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioCarrritoMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioCarrritoMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
