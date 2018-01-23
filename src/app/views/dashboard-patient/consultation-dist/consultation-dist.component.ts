


import {Component, OnInit} from "@angular/core";
import {DoctorModel} from "../../../models/doctor.model";
import {ConsultationDistanceModel} from "app/models/ConsultationDistance.model";
import {DocteurService} from "../../../services/docteur.service";
import {DossierModel} from "../../../models/dossier.model";
import {DossierService} from "../../../services/dossier.service";
import {ConsultationModel} from "../../../models/consultation.model";
import {PatientModel} from "../../../models/patient.model";
import {ConsultationDistService} from "../../../services/consultation-dist.service";

@Component({
  selector:'cons-patient',
  templateUrl :'consultation-dist.component.html'
})
export class ConsultationDistComponent implements OnInit{

  docteurs:DoctorModel[];
  consultation:ConsultationDistanceModel[] = [];


  constructor(private doctorService:DocteurService,private dossierMedicalService:DossierService,private consService:ConsultationDistService){

  }

  dossier:DossierModel;
  ngOnInit(): void {

    this.dossierMedicalService.getDossierPatient(34).subscribe(
      (result) =>{
        this.dossier = new DossierModel(result.idDossierMedical,new Date(result.dateCreation),PatientModel.createPatient(result.patient));
        let consultations: ConsultationModel[]=[];
        for(let c of result.consultations){
          consultations.push(ConsultationModel.createConsultation(c));
        }
        this.dossier.consultations=consultations;
        this.consService.getByPatient(this.dossier.patient.idPersonne).subscribe(
          (result) => {
            console.log(result)
            for(let c of result){
              this.consultation.push(ConsultationDistanceModel.createConsultation(c));
            }

            console.log(this.consultation);
          },
          (error ) => {

          }
        )
      },
      (error)=>{

      }
    );


    this.doctorService.getAllDoctor().subscribe(
      (result) => {
        this.docteurs = [];
        for (let r of result) {
          this.docteurs.push(DoctorModel.createDoctor(r));
        }

      },
      (error) =>{

      }
    )
  }



  onSendMessage(value){
    console.log(value);
    let c = new ConsultationDistanceModel(0,value,this.dossier.patient,new Date(Date.now()),this.docteurs[0]);
    this.consService.addConsultation(c).subscribe(
      (result) => {

      },
      (error)=> {
        console.log(error);
      }
    );
    this.consultation.push(c);
  }

}
