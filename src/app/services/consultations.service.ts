import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import 'rxjs/add/operator/map'
import {DossierModel} from "../models/dossier.model";
import {PatientModel} from "../models/patient.model";
import {ConsultationModel} from "../models/consultation.model";
@Injectable()
export class ConsultationsService {
  constructor(private http: Http) {
  }

  getConsultations(id: Number,token?) {
    let header = new Headers({'Access-Control-Allow-Origin': '*','Authorization':token});
    return this.http.get('http://localhost:9999/consultation/' + id,{headers: header}).map(res => res.json());

  }

  addConsultation(idDossier: Number, consulation,token?) {
    let header = new Headers({'Access-Control-Allow-Origin': '*','Authorization':token});
    return this.http.post('http://localhost:9999/dossiermedical/' + idDossier + '/consultation/', consulation, {headers: header}).map(res => res.json())
  }

  editConsultation(id,consulation,token?){
    let header = new Headers({'Access-Control-Allow-Origin': '*','Authorization':token});
    return this.http.put('http://localhost:9999/dossiermedical/'+id+'/consultation', consulation, {headers: header}).map(res => res.json())

  }

}
