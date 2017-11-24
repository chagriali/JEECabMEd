import {Injectable} from "@angular/core";
import {Headers,Http} from "@angular/http";
import 'rxjs/add/operator/map'
@Injectable()
export class SymptomeService{

  constructor(private http:Http) {}

  getSymptomes(){
    return this.http.get('http://192.168.1.11:8080/symptome').map(res => res.json());
  }

  addSymptome(symptome){
    let header = new Headers({'Access-Control-Allow-Origin': '*'});
    return this.http.post('http://192.168.1.11:8080/symptome',symptome,{headers:header}).map(res => res.json());
  }
}
