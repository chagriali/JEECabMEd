

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

@Injectable()
export class ConsultationDistService {
  constructor(private http:Http){}

  getConsultation(){
    return this.http.get('http://localhost:9999/consultationdistance').map(res => res.json());
  }

  addConsultation(c){
    return this.http.post('http://localhost:9999/consultationdistance',c).map(res => res.json());
  }


  updateConsultation(c){
    return this.http.put('http://localhost:9999/consultationdistance',c).map(res => res.json());
  }

  getByDoctor(id){
    return this.http.get('http://localhost:9999/consultationdistance/docteur/'+id).map(res => res.json());
  }


  getByPatient(id){
    return this.http.get('http://localhost:9999/consultationdistance/patient/'+id).map(res => res.json());
  }


}
