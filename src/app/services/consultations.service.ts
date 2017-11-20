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

  getConsultations(id: Number) {
    return this.http.get('http://192.168.43.225:8080/consultation/' + id).map(res => res.json());

  }

  addConsultation(idDossier: Number, consulation) {

    let header = new Headers({'Access-Control-Allow-Origin': '*',});
    return this.http.post('http://192.168.43.225:8080/' + idDossier + '/consultation/', consulation, {headers: header}).map(res => res.json())
  }

}
