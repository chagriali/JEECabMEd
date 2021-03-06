import {Injectable} from "@angular/core";
import {Http,Headers} from "@angular/http";

@Injectable()
export class MedicamentService {
  constructor(private http:Http){}

  getMedicaments(token?){
    let header = new Headers({'Access-Control-Allow-Origin': '*','Authorization':token});
    return this.http.get('http://localhost:9999/medicament',{headers:header}).map(res => res.json());
  }
}
