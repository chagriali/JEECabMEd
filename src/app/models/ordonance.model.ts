import {PrescriptionModel} from "./prescription.model";

export class OrdonanceModel {
  idOrdonnance:Number;
  dateOrdonnace:Date;
  prescriptions: PrescriptionModel[];

  constructor(idOrdonnance?: Number, dateOrdonnace?: Date, prescription?: PrescriptionModel[]) {
    this.idOrdonnance = idOrdonnance;
    this.dateOrdonnace = dateOrdonnace;
    this.prescriptions = prescription;
  }

  static createOrdonance(object:any){
    if(object == null) return null;
    return new OrdonanceModel(
      object.idOrdonnance,
      object.dateOrdonnace,
      PrescriptionModel.createArrayPrescrption(object.prescriptions)
    )
  }

}
