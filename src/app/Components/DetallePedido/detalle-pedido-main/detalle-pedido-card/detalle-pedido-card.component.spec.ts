import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePedidoCardComponent } from './detalle-pedido-card.component';

describe('DetallePedidoCardComponent', () => {
  let component: DetallePedidoCardComponent;
  let fixture: ComponentFixture<DetallePedidoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallePedidoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePedidoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
