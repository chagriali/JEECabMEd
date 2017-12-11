export class MedicamentModel{
  idMedicament:Number;
  libelle:String;
  description:String;

  constructor(id: Number, libelle: String , description:String) {
    this.idMedicament = id;
    this.libelle = libelle;
    this.description=description;
  }
  static createMedicament(object:any){
    return new MedicamentModel(object.idSymptome,object.libelle,object.description);
  }

}
