

import {DoctorModel} from "./doctor.model";
import {SymptomeModel} from "./symptome.model";
import {OrdonanceModel} from "./ordonance.model";
import {MaladieModel} from "./maladie.model";

export class ConsultationModel{

  idConsultation:Number;
  dateConsultation:Date;
  docteur:DoctorModel;
  poid:Number;
  temperature:Number;
  symptomes:SymptomeModel[];
  maladies:MaladieModel[];
  ordonnance:OrdonanceModel;
  montant_payee:Number;


  constructor(id?: Number, date?: Date  , Doc?:DoctorModel ,poids?:Number,temperature?:Number , symp?:SymptomeModel[],ordonance?:OrdonanceModel,maladies?:MaladieModel[],montant?:Number ) {
    this.idConsultation = id;
    this.dateConsultation = date;

    this.docteur=Doc;
    this.poid=poids;
    this.temperature=temperature;
    this.symptomes=symp;
    this.ordonnance = ordonance;
    this.maladies = maladies;
    this.montant_payee = montant;
  }

  static createConsultation(object:any){
    return new ConsultationModel(
       object.idConsultation,
      new Date(object.dateConsultation),
      DoctorModel.createDoctor(object.docteur),
      object.poid,
      object.temperature,
      SymptomeModel.createSymptomeArray(object.symptomes),
      OrdonanceModel.createOrdonance(object.ordonnance),
      MaladieModel.createMaladieArray(object.maladies),
      object.montant
      );
  }
}
