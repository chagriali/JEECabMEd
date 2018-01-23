import {Injectable} from "@angular/core";
import {Http,Headers} from "@angular/http";
import 'rxjs/add/operator/map'
@Injectable()
export class SexService{

  constructor(private http:Http) {}

  getGender(token?){
    let header = new Headers({'Access-Control-Allow-Origin': '*','Authorization':token});
          return this.http.get('http://localhost:9999/gender',{headers:header}).map(res => res.json());
  }
}
