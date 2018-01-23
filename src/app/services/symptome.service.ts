import {Injectable} from "@angular/core";
import {Headers,Http} from "@angular/http";
import 'rxjs/add/operator/map'
@Injectable()
export class SymptomeService{

  constructor(private http:Http) {}

  getSymptomes(token?){
    let header = new Headers({'Access-Control-Allow-Origin': '*','Authorization':token});
    return this.http.get('http://localhost:9999/symptome',{headers:header}).map(res => res.json());
  }

  addSymptome(symptome,token?){
    let header = new Headers({'Access-Control-Allow-Origin': '*','Authorization':token});
    return this.http.post('http://localhost:9999/symptome',symptome,{headers:header}).map(res => res.json());
  }
}
