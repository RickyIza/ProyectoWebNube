import { Component, OnInit, Input } from '@angular/core';
import { ReporteVentasService } from 'src/app/Services/reporte-ventas.service';
import { ReporteVentas } from 'src/app/Models/reporte-ventas'
import { Chart } from 'chart.js';
import { Label, SingleDataSet, MultiDataSet } from 'ng2-charts';
import { Data } from '@angular/router';
import { ReportePedidos } from 'src/app/Models/reporte-pedidos';
import { element } from 'protractor';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  //reporte de productos más vendidos
  reportes : ReporteVentas[];
  cantidad : SingleDataSet = [];
  nombres : Label[] = [];
  //reporte de pedidos
  pedidos: ReportePedidos[];
  numero: SingleDataSet = [];
  nombre : string[]  = [];
  

  constructor(private reporteService : ReporteVentasService) { }

  ngOnInit() {
    this.list();
    this.listpedidos();
  }

  //lista los productos más vendidos
  list() : void{
    this.reporteService.list().subscribe(result => {
      this.reportes = result;
      this.datos();
    });
  }

  datos() {
    this.reportes.forEach(element => {
      this.cantidad.push(element.Cantidad);
      this.nombres.push(element.Producto);
    });

    var myChart = new Chart("Productos", {
      type: 'doughnut',
      data: {
          labels: this.nombres,
          datasets: [{
              label: '# of Votes',
              data: this.cantidad,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
    });
  }

  //reportes de los clientes con más pedidos
  listpedidos(){
    this.reporteService.listVentas().subscribe(x => {
      this.pedidos = x;
      this.datospedidos();
    });
  }

  datospedidos(){
    this.pedidos.forEach(element => {
      this.nombre.push(element.Cliente);
      this.numero.push(element.Pedidos);
    });

    var pedidos = new Chart("Pedidos", {
      type: 'doughnut',
      data: {
          labels: this.nombre,
          datasets: [{
              label: '# of Votes',
              data: this.numero,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
    });
  }
}
