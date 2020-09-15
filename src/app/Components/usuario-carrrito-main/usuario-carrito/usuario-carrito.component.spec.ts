import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioCarritoComponent } from './usuario-carrito.component';

describe('UsuarioCarritoComponent', () => {
  let component: UsuarioCarritoComponent;
  let fixture: ComponentFixture<UsuarioCarritoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioCarritoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
