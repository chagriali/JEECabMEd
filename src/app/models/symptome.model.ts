export class SymptomesModel{
  id_symptome:Number
  libele:String;
  description:String;

  constructor(id: Number, libelle: String , description:String) {
    this.id_symptome = id;
    this.libele = libelle;
    this.description=description;
  }
}
