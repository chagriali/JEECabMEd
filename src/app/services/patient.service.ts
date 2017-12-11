import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import 'rxjs/add/operator/map'
import {PatientModel} from "../models/patient.model";
@Injectable()

export class PatientService{
  constructor(private http:Http) {}
  addPatient(patient:PatientModel){
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:9999/dossiermedical',patient,{headers:headers});
  }
}
