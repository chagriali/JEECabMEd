

import {Injectable} from "@angular/core";
import {Http,Headers} from "@angular/http";
import {RendeVousModel} from "../models/rendeVous.model";

@Injectable()
export class RendezvousService {

  constructor(private http: Http) {
  }

  getAllRendezVous(token?){
    let header = new Headers({'Access-Control-Allow-Origin': '*','Authorization':token});
    return this.http.get('http://localhost:9999/rendezVous',{headers:header}).map(res => res.json());
  }

  updateRendezVous(rdv:RendeVousModel,token?){
    let headers = new Headers({'Content-Type': 'application/json','Authorization':token});
    //let header = new Headers({'Access-Control-Allow-Origin': '*','Authorization':token});
    console.log(rdv);
    return this.http.put('http://localhost:9999/rendezVous',rdv,{headers:headers}).map(res => res.json());
  }

  addRendezVous(rdv:RendeVousModel,token?){
    let header = new Headers({'Access-Control-Allow-Origin': '*','Authorization':token});
    return this.http.post('http://localhost:9999/rendezVous',rdv,{headers:header}).map(res => res.json());
  }

  getRendezVousByDate(annee:Number,mois:Number,jour:Number,token?){
    let header = new Headers({'Access-Control-Allow-Origin': '*','Authorization':token});
    return this.http.get('http://localhost:9999/rendezVous/'+annee+'/'+mois+'/'+jour+'',{headers:header}).map(res => res.json());
  }
}
