import {Component, OnInit, ViewChild} from '@angular/core';
import {ReportingService} from "../../services/reporting.service";
import { Router} from '@angular/router';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit{
  @ViewChild('baseChart') private _chart;
  doughnutChartData:Number[] = [0,0,0];
  recette:Number[] = [0,0];
  depenses:Number[] = [0,0];
  profit:Number[] =[0,0];
  barChartOptions:any = {};
  barChartLabels:string[]=[];
  public barChartType:string;
  barChartLegend:boolean;
  barChartData:any[] = [];
  public doughnutChartLabels:string[] = ['Recette Dhs', 'Dépenses Dhs', 'Profit Dhs'];

  public doughnutChartType:string = 'doughnut';
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
  public chartHovered(e:any):void {
    console.log(e);
  }

  constructor(private reportingservice:ReportingService  , private router:Router) { }
  ngOnInit(): void {
    console.log(Date.now());
    console.log(Date.now());
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
        for(let i =0 ; i<3 ; i++){
          this.doughnutChartData[i] = result[3][i];
        }
        this.doughnutChartData=this.doughnutChartData.slice();
        this.profit=this.profit.slice();
        this.depenses=this.depenses.slice();
        this.recette=this.recette.slice();
        this.barChartData = this.barChartData.slice();
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
    this.profit=this.profit.slice();
    this.depenses=this.depenses.slice();
    this.recette=this.recette.slice();
    this.barChartData= [
      {data: this.recette, label: 'Recette Dhs'},
      {data: this.depenses, label: 'Depense Dhs'},
      {data: this.profit, label: 'Profit Dhs'},
    ];
  }
  MesDepenses(){
    this.router.navigate(['/doctor/depenses']);
  }
}
