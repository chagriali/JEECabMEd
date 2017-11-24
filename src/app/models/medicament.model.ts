export class MedicamentModel{
  idMedicament:Number;
  libele:String;
  description:String;

  constructor(id: Number, libelle: String , description:String) {
    this.idMedicament = id;
    this.libele = libelle;
    this.description=description;
  }
  static createMedicament(object:any){
    return new MedicamentModel(object.idSymptome,object.libelle,object.description);
  }

}
