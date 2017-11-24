import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

@Injectable()
export class MedicamentService {
  constructor(private http:Http){}

  getMedicaments(){
    return this.http.get('http://192.168.1.11:8080/medicament').map(res => res.json());
  }
}
