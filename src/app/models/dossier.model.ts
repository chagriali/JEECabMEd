
import {PatientModel} from "./patient.model";

export class DossierModel{
  id_dossier_medical:Number;
  date_creation:Date;
  patient:PatientModel;

  constructor(id_dossier_medical: Number, date_creation: Date, patient?: PatientModel) {
    this.id_dossier_medical = id_dossier_medical;
    this.date_creation = date_creation;
    this.patient = patient;
  }

}
