import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePedidoMainComponent } from './detalle-pedido-main.component';

describe('DetallePedidoMainComponent', () => {
  let component: DetallePedidoMainComponent;
  let fixture: ComponentFixture<DetallePedidoMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallePedidoMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePedidoMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
