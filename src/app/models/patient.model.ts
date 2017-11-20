
import {Ref_sexModel} from "./ref_sex.model";

export class PatientModel{

  idPersonne:Number;
  nom:String;
  cin:String;
  prenom:String;
  email:String;
  date_naissance:Date;
  telephone:String
  refSex:Ref_sexModel;


  constructor(nom: String, cin?: String, prenom?: String,telephone?:String, email?: String, date_naissance?: Date,refSex?:Ref_sexModel,idPersonne?: Number) {
    this.idPersonne = idPersonne;
    this.nom = nom;
    this.cin = cin;
    this.prenom = prenom;
    this.email = email;
    this.date_naissance = date_naissance;
    this.refSex = refSex;
    this.telephone = telephone;
  }

  static createPatient(object:any){
    return new PatientModel(object.nom,object.cin,object.prenom,object.telephone,object.email,new Date(object.dateNaissance) ,new Ref_sexModel(object.refSex.idSexe,object.refSex.libelle),object.idPersonne);
  }


}
