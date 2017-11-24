import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import 'rxjs/add/operator/map'
@Injectable()
export class SexService{

  constructor(private http:Http) {}

  getGender(){
          return this.http.get('http://192.168.1.11:8080/gender').map(res => res.json());
  }
}
