

import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {DoctorModel} from "../../models/doctor.model";
import {Http, Headers, Response} from "@angular/http";

@Injectable()
export class AuthDoctorService{
   token:String;
  private doctor:DoctorModel;

  constructor(private router:Router,private http:Http){}

  login(userName:String,password:String){
    if(userName != '' && password != '')
    {
      let o:any = {
        username:userName,
        password:password
      };
      console.log(o);

      let header = new Headers({'Access-Control-Allow-Origin': '*','Accept':'*/*','Cache-Control':'no-cache','Access-Control-Expose-Headers': 'Authorization'});
      /*this.http.post('http://localhost:9999/login',o,{headers : header }).subscribe(
        (res:Response) => {
          this.token = res.headers.get('Authorization')

          /*this.http.get('http://localhost:9999/docteur/1').map(res => res.json()).subscribe(
            (result) =>{
              this.doctor = DoctorModel.createDoctor(result);
              this.token = '554dsdsfsd';
              this.router.navigate(['/doctor/patient-list']);
            },
            (error)=> {

            })*/
        }/*,
        (error) => {
            console.log(error)
        }
      );*/

      this.token = '87dsqv87sqvqsd';
      this.http.get('http://localhost:9999/docteur/1').map(res => res.json()).subscribe(
        (result) =>{
          this.doctor = DoctorModel.createDoctor(result);
          this.token = '554dsdsfsd';
          this.router.navigate(['/doctor/patient-list']);
        },
        (error)=> {

        }
      )
    }


  isAuthenticated(){
    return this.token != null;
  }

  logout(){
    this.token = null;
    this.router.navigate(['/doctor/auth']);
  }

  getDoctor(){
    return this.doctor;
  }
}
