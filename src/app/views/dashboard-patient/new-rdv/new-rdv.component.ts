

import {Component, OnInit} from "@angular/core";


import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import {DossierModel} from "../../../models/dossier.model";
import {Http} from "@angular/http";
import {DossierService} from "../../../services/dossier.service";
import {PatientModel} from "../../../models/patient.model";
import {ConsultationModel} from "../../../models/consultation.model";
import {DocteurService} from "../../../services/docteur.service";
import {DoctorModel} from "../../../models/doctor.model";
import {RendeVousModel} from "../../../models/rendeVous.model";
import {RendezvousService} from "../../../services/rendezvous.service";



@Component({
  selector : 'new-rdv',
  templateUrl : 'new-rdv.component.html'
})
export class NewRdvComponent implements OnInit{

  constructor(private dossierMedicalService:DossierService,private doctorService:DocteurService,private rdvService:RendezvousService){

  }

  dossier:DossierModel;
  docteurs:DoctorModel[];
  drap = false;

  moment:Date;
  ngOnInit(): void {
    this.dossierMedicalService.getDossierPatient(34).subscribe(
      (result) =>{
        this.dossier = new DossierModel(result.idDossierMedical,new Date(result.dateCreation),PatientModel.createPatient(result.patient));
        let consultations: ConsultationModel[]=[];
        for(let c of result.consultations){
          consultations.push(ConsultationModel.createConsultation(c));
        }
        this.dossier.consultations=consultations;
        console.log(this.dossier)
      },
      (error)=>{

      }
    );

    this.doctorService.getAllDoctor().subscribe(
      (result) => {
        this.docteurs = [];
        for(let r of result){
          this.docteurs.push(DoctorModel.createDoctor(r));
        }
        console.log(this.docteurs);

      },
      (error) => {

      })

  }


  onAddrdv() {
    this.drap =  true
  }

  isRdvValid(){
    if(this.moment != null){
      if(this.moment.getTime() >= Date.now())
        return true;
    }
    return false;
  }


  onSubmit(form,value){
    let rdv = new RendeVousModel(this.dossier.patient,this.docteurs.find( d => d.idPersonne ==value),0,this.moment,null,0);
    console.log(rdv);
    this.rdvService.addRendezVous(rdv).subscribe(
      (result) => {
        console.log(result);
        this.drap = false;
        this.moment = null;
      },
      (error)=> {
        console.log(error);
      }
    )
  }
}
