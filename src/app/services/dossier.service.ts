import {Injectable} from "@angular/core";
import { Http,Headers} from "@angular/http";
import 'rxjs/add/operator/map'
import {DossierModel} from "../models/dossier.model";
import {PatientModel} from "../models/patient.model";
@Injectable()
export class DossierService{
  dossiers:DossierModel[];
  constructor(private http:Http) {}
  getDossiers(token?){
    let header = new Headers({'Access-Control-Allow-Origin': '*','Authorization':token});
    return this.http.get('http://localhost:9999/dossiermedical',{headers:header}).map(res => res.json());

  }
  getDossierPatient(id:number,token?){
    let header = new Headers({'Access-Control-Allow-Origin': '*','Authorization':token});
    return this.http.get('http://localhost:9999/dossiermedical/'+id,{headers:header}).map(res => res.json());
  }
}
