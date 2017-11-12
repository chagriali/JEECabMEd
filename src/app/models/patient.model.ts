
import {Ref_sexModel} from "./ref_sex.model";

export class PatientModel{

  id:Number;
  nom:String;
  cin:String;
  prenom:String;
  email:String;
  date_naissance:Date;
  telephone:String
  ref_sex:Ref_sexModel;


  constructor(nom: String, cin?: String, prenom?: String,telephone?:String, email?: String, date_naissance?: Date,refSex?:Ref_sexModel,id?: Number) {
    this.id = id;
    this.nom = nom;
    this.cin = cin;
    this.prenom = prenom;
    this.email = email;
    this.date_naissance = date_naissance;
    this.ref_sex = refSex;
    this.telephone = telephone;
  }


}
