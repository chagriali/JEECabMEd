
import {Injectable} from "@angular/core";
import {Http,Headers} from "@angular/http";

@Injectable()
export class DocteurService{
  constructor(private http:Http){

  }

  getAllDoctor(token?){
    let header = new Headers({'Access-Control-Allow-Origin': '*','Authorization':token});
    return this.http.get('http://localhost:9999/docteur',{headers: header}).map(res => res.json());
  }
}
