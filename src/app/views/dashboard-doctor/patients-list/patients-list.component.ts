import {Component, OnInit} from "@angular/core";
import {DossierService} from "../../../services/dossier.service";
import {DossierModel} from "../../../models/dossier.model";
import {PatientModel} from "../../../models/patient.model";
import {ConsultationModel} from "../../../models/consultation.model";
import { Router} from '@angular/router';
import {AuthDoctorService} from "../../../services/auth/auth-doctor.service";
@Component({
  selector : 'doctor-patient-list',
  templateUrl : 'patients-list.component.html'
})
export class DoctorPatientsListComponent implements OnInit{
  dossiers:DossierModel[] = [];
  data:Array<any> = [];
  constructor(private dossierService:DossierService, private router:Router,private authService:AuthDoctorService){
    this.length = this.data.length;
  }
  ngOnInit(): void {

    this.dossierService.getDossiers(this.authService.token).subscribe(
      (result)=>{
        console.log(result);
        let dossiers:DossierModel[] = [];
        let d : DossierModel;

        for (let dossier of result){
          console.log(dossier);
          this.data.push({
            'nom':dossier.patient.nom +' ' + dossier.patient.prenom,
            'email':dossier.patient.email,
            'tel':dossier.patient.telephone,
            'action':'<button class="btn-primary" ><i hidden>'+dossier.idDossierMedical+'</i>Details</button>'
          });
          d = new DossierModel(dossier.idDossierMedical,new Date(dossier.dateCreation),PatientModel.createPatient(dossier.patient));
          let consultations: ConsultationModel[]=[];
          for(let c of dossier.consultations){
            consultations.push(ConsultationModel.createConsultation(c));
          }
          d.consultations=consultations;
          dossiers.push(d);
        }
        this.dossiers = dossiers;
        console.log(this.dossiers);
        this.onChangeTable(this.config)
      }
      ,
      (error)=>{
        console.log(error);
      }
    );

    this.onChangeTable(this.config);
  }
  onDetailClick(id:Number){
    this.router.navigate(['/doctor/patient-detail',id]);
  }


  //////////////////////////////////////////////::::
  public rows:Array<any> = [];
  public columns:Array<any> = [
    {title: 'Nom/prenom', name: 'nom', filtering: {filterString: '', placeholder: 'Filter by nom'}},
    {title: 'Email', name: 'email',filtering: {filterString: '', placeholder: 'Filter by prenom'}},
    {title: 'Tel', name: 'tel',filtering: {filterString: '', placeholder: 'Filter by prenom'}},
    { title: 'Action', name: 'action', sort: false},
  ];
  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };






  public changePage(page:any, data:Array<any> = this.data):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data:any, config:any):any {
    let filteredData:Array<any> = data;
    this.columns.forEach((column:any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item:any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item:any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray:Array<any> = [];
    filteredData.forEach((item:any) => {
      let flag = false;
      this.columns.forEach((column:any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.data.length}):any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  public onCellClick(data: any): any {

    if (data.column === 'action'){
      var col = data.row.action;
      var id = col.match(/<i hidden>(.*)<\/i>/);
      this.router.navigate(['/doctor/patient-detail',id[1]]);
    }
  }

}
