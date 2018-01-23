import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import 'rxjs/add/operator/map'
@Injectable()
export class ReportingService {
  constructor(private http: Http) {
  }

  getDataReportingDepensesAndRecette(id: Number,token?) {
    let header = new Headers({'Access-Control-Allow-Origin': '*','Authorization':token});
    return this.http.get('http://localhost:9999/report/' + id,{headers:header}).map(res => res.json());
  }

}
