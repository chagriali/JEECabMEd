import {Component, OnInit} from '@angular/core';
import {ReportingService} from "../../services/reporting.service";

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit{
  recette:Number[] = [];
  depenses:Number[] = [];
  profit:Number[] = [];
  barChartOptions:any = {};
  barChartLabels:string[]=[];
  public barChartType:string;
  barChartLegend:boolean;
  barChartData:any[] = [];
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
  public chartHovered(e:any):void {
    console.log(e);
  }
  constructor(private reportingservice:ReportingService ) { }
  ngOnInit(): void {
    this.reportingservice.getDataReportingDepensesAndRecette(2017).subscribe(
      (result)=>{
        for(let i =0 ; i<12 ; i++){
          this.recette[i] = result[0][i];
        }
        for(let i =0 ; i<12 ; i++){
          this.depenses[i] = result[1][i];
        }
        for(let i =0 ; i<12 ; i++){
          this.profit[i] = result[2][i];
        }
      }
      ,
      (error)=>{
        console.log(error);
      }
    );
    this.barChartOptions= {
      scaleShowVerticalLines: true,
      responsive: true,
    };
    this.barChartType = 'bar';
    this.barChartLegend = true;
    this.barChartLabels= ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet' ,'Aout' ,'Septembre' ,
      'Octobre' , 'Novembre' , 'Decembre'];
    this.barChartData= [
      {data: this.recette, label: 'Recette DHs'},
      {data: this.depenses, label: 'Depense DHs'},
      {data: this.profit, label: 'Profit Dhs'},
    ];
  }
}
