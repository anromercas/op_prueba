import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafico-barras',
  templateUrl: './grafico-barras.component.html',
  styles: []
})
export class GraficoBarrasComponent implements OnInit {

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['2011', '2012', '2013', '2014', '2015', '2016', '2017'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Rechazadas/Caducadas'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Aceptadas'}
  ];

  constructor() { }

  ngOnInit() {
  }


  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
