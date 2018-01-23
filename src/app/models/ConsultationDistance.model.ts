import {PatientModel} from "./patient.model";
import {DoctorModel} from "./doctor.model";

export class ConsultationDistanceModel{
  idConsultationDistance:Number;
  etat:Number;
  message:String;
  patient:PatientModel;
  dateConsultation:Date;
  docteur:DoctorModel;


  constructor( etat: Number, message: String, patient: PatientModel, dateConsultation: Date, docteur: DoctorModel,idConsultationDistance?: Number) {
    this.idConsultationDistance = idConsultationDistance;
    this.etat = etat;
    this.message = message;
    this.patient = patient;
    this.dateConsultation = dateConsultation;
    this.docteur = docteur;
  }

  static createConsultation(object:any){
    if(object == null) return null;

    return new ConsultationDistanceModel(object.etat,object.message,PatientModel.createPatient(object.patient),new Date(object.dateConsultation),DoctorModel.createDoctor(object.docteur),object.idConsultationDistance);
  }

}
