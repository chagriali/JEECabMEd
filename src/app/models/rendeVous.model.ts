

import {PatientModel} from "./patient.model";
import {DoctorModel} from "./doctor.model";

export class RendeVousModel{
  idRendezVous:Number;
  patient:PatientModel;
  docteur:DoctorModel;
  etat:Number;
  date:Date;
  heure;
  etatActuel:Number;


  constructor(patient: PatientModel, docteur: DoctorModel, etat: Number, date: Date, heure,etatActuel,idRendezVous?: Number) {
    this.idRendezVous = idRendezVous;
    this.patient = patient;
    this.docteur = docteur;
    this.etat = etat;
    this.date = date;
    this.heure = heure;
    this.etatActuel = etatActuel;
  }

  static createRendezVous(object:any){
    if(object == null) return null;
    return new RendeVousModel(PatientModel.createPatient(object.patient),object.docteur,object.etat,new Date(object.date),object.heure,object.etatActuel,object.idRendezVous);
  }

  isOnwait(){
    return this.etat == 0
  }

  isValid(){
    return this.etat == 1
  }


  isCancel(){
    return this.etat == 2
  }
}
