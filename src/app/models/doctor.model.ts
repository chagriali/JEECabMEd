
import {Ref_sexModel} from "./ref_sex.model";

export class DoctorModel{

  idPersonne:Number;
  nom:String;
  cin:String;
  prenom:String;
  email:String;
  date_naissance:Date;
  telephone:String
  //refSex:Ref_sexModel;


  constructor(nom: String, cin?: String, prenom?: String,telephone?:String, email?: String, date_naissance?: Date,idPersonne?: Number) {
    this.idPersonne = idPersonne;
    this.nom = nom;
    this.cin = cin;
    this.prenom = prenom;
    this.email = email;
    this.date_naissance = date_naissance;
    this.telephone = telephone;
  }
  static createDoctor(object:any){
    if(object == null) return null;
    return new DoctorModel(object.nom,object.cin,object.prenom,object.telephone,object.email,new Date(object.dateNaissance) ,object.idPersonne);
  }

}
