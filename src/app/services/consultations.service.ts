import {Injectable} from "@angular/core";
import { Http} from "@angular/http";
import 'rxjs/add/operator/map'
import {DossierModel} from "../models/dossier.model";
import {PatientModel} from "../models/patient.model";
@Injectable()
export class ConsultationsService{
  constructor(private http:Http) {}
  getConsultations(id:Number){
    return this.http.get('http://localhost:8080/consultation/'+id).map(res => res.json());

  }
}
