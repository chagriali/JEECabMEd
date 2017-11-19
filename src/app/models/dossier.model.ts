
import {PatientModel} from "./patient.model";
import {ConsultationModel} from "./consultation.model";

export class DossierModel{
  id_dossier_medical:Number;
  date_creation:Date;
  patient:PatientModel;
  consultations:ConsultationModel[];
  constructor(id_dossier_medical: Number, date_creation: Date, patient?: PatientModel,consultations?:ConsultationModel[]) {
    this.id_dossier_medical = id_dossier_medical;
    this.date_creation = date_creation;
    this.patient = patient;
    this.consultations=consultations;
  }

}
