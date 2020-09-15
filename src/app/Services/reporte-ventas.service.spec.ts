import { TestBed } from '@angular/core/testing';

import { ReporteVentasService } from './reporte-ventas.service';

describe('ReporteVentasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReporteVentasService = TestBed.get(ReporteVentasService);
    expect(service).toBeTruthy();
  });
});
