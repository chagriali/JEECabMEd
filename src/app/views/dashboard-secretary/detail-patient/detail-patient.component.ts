import {Component, OnInit} from "@angular/core";
import {DossierService} from "../../../services/dossier.service";
import {DossierModel} from "../../../models/dossier.model";
import {PatientModel} from "../../../models/patient.model";

@Component({
  selector : 'app-patient-detail',
  templateUrl : 'detail-patient.component.html'
})
export class DetailPatientComponent implements OnInit{

  constructor(private dossierService:DossierService){}
  dossier : DossierModel;
  ngOnInit(): void {
    this.dossierService.getDossierPatient(1).subscribe(
      (result)=>{
          this.dossier = (new DossierModel(result.id_dossier_medical,new Date(result.date_creation),PatientModel.createPatient(result.patient)));

        console.log(this.dossier);
      }
      ,
      (error)=>{
        console.log(error);
      }
    );
  }
}
