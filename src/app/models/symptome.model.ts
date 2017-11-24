export class SymptomeModel{
  idSymptome:Number
  libele:String;
  description:String;

  constructor(id: Number, libelle: String , description:String) {
    this.idSymptome = id;
    this.libele = libelle;
    this.description=description;
  }
  static createSymptome(object:any){
    return new SymptomeModel(object.idSymptome,object.libele,object.description);
  }

}
