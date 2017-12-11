import {MedicamentModel} from "./medicament.model";

export class PrescriptionModel {
  idPrescription;
  description:String;
  nbreFois:String;
  periode:String;
  quand:String;
  quantite:String;
  medicament:MedicamentModel;

  constructor(idPrescription?, description?: String, nbreFois?: String, periode?: String, quand?: String, quantite?: String,medicament?:MedicamentModel) {
    this.idPrescription = idPrescription;
    this.description = description;
    this.nbreFois = nbreFois;
    this.periode = periode;
    this.quand = quand;
    this.quantite = quantite;
    this.medicament = medicament;
  }

  static createArrayPrescrption(objectArray : any[]):PrescriptionModel[]{
      let prescArray : PrescriptionModel[] = [];
      for (let p of objectArray){
        prescArray.push(new PrescriptionModel(p.idPrescription,p.description,p.nbreFois,p.periode,p.quand,p.quantite,new MedicamentModel(p.medicament.idMedicament,p.medicament.libelle,p.medicament.description)));
      }
      return prescArray;
  }
}
