import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabeceraPedidoFormComponent } from './cabecera-pedido-form.component';

describe('CabeceraPedidoFormComponent', () => {
  let component: CabeceraPedidoFormComponent;
  let fixture: ComponentFixture<CabeceraPedidoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabeceraPedidoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabeceraPedidoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
