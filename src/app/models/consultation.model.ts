

import {DoctorModel} from "./doctor.model";
import {SymptomeModel} from "./symptome.model";

export class ConsultationModel{

  id_consultation:Number;
  date_consultation:Date;
  duree:Number;
  docteur:DoctorModel;
  poids:Number;
  temperature:Number;
  symptomes:SymptomeModel[];


  constructor(id?: Number, date?: Date , duree?:Number , Doc?:DoctorModel ,poids?:Number,temperature?:Number , symp?:SymptomeModel[]  ) {
    this.id_consultation = id;
    this.date_consultation = date;
    this.duree = duree;
    this.docteur=Doc;
    this.poids=poids;
    this.temperature=temperature;
    this.symptomes=symp;
  }

  static createConsultation(object:any){
    return new ConsultationModel(
      object.id_consultation,
      object.date_consultation,
      object.duree,
      new DoctorModel(object.docteur),
      object.poids,
      object.temperature,
       null,
      );
  }
}
