import {Injectable} from "@angular/core";
import { Http} from "@angular/http";
import 'rxjs/add/operator/map'
import {DossierModel} from "../models/dossier.model";
import {PatientModel} from "../models/patient.model";
@Injectable()
export class DossierService{
  dossiers:DossierModel[];
  constructor(private http:Http) {}
  getDossiers(){
    return this.http.get('http://localhost:9999/dossiermedical').map(res => res.json());

  }
  getDossierPatient(id:number){
    return this.http.get('http://localhost:9999/dossiermedical/'+id).map(res => res.json());
  }
}
