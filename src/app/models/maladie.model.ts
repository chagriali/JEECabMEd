export class MaladieModel{
  idMaladie:Number
  libele:String;
  description:String;

  constructor(id: Number, libele: String , description:String) {
    this.idMaladie = id;
    this.libele = libele;
    this.description=description;
  }
  static createSymptome(object:any){
    if(object == null) return null;
    return new MaladieModel(object.idMaladie,object.libele,object.description);
  }
  static createMaladieArray(object:any){
    if(object == null) return null;
    let symptome:MaladieModel[] = [];
    for(let s of object){
      symptome.push(new MaladieModel(s.idMaladie,s.libele,s.description))
    }
    return symptome;
  }
}
