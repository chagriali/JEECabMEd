import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import 'rxjs/add/operator/map'
@Injectable()
export class ReportingService {
  constructor(private http: Http) {
  }

  getDataReportingDepensesAndRecette(id: Number) {
    return this.http.get('http://localhost:8080/report/' + id).map(res => res.json());
  }

}
