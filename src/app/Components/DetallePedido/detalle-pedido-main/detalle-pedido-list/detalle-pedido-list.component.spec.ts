import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePedidoListComponent } from './detalle-pedido-list.component';

describe('DetallePedidoListComponent', () => {
  let component: DetallePedidoListComponent;
  let fixture: ComponentFixture<DetallePedidoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallePedidoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePedidoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
