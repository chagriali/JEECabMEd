
import {Ref_sexModel} from "./ref_sex.model";

export class PatientModel{

  idPersonne:Number;
  nom:String;
  cin:String;
  prenom:String;
  email:String;
  date_naissance:Date;
  telephone:String
  ref_sex:Ref_sexModel;


  constructor(nom: String, cin?: String, prenom?: String,telephone?:String, email?: String, date_naissance?: Date,refSex?:Ref_sexModel,idPersonne?: Number) {
    this.idPersonne = idPersonne;
    this.nom = nom;
    this.cin = cin;
    this.prenom = prenom;
    this.email = email;
    this.date_naissance = date_naissance;
    this.ref_sex = refSex;
    this.telephone = telephone;
  }

  static createPatient(object:any){
    return new PatientModel(object.nom,object.cin,object.prenom,object.telephone,object.email,new Date(object.date_naissance) ,new Ref_sexModel(object.ref_sex.id_sexe,object.ref_sex.libelle),object.idPersonne);
  }


}
