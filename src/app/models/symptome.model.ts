export class SymptomeModel{
  id_symptome:Number
  libele:String;
  description:String;

  constructor(id: Number, libelle: String , description:String) {
    this.id_symptome = id;
    this.libele = libelle;
    this.description=description;
  }
  static createSymptome(object:any){
    return new SymptomeModel(object.id_symptome,object.libele,object.description);
  }

}
