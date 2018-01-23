


import {Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {Http,Headers,Response} from "@angular/http";
@Injectable()
export class AuthSecretatyService{
   token:String;

  constructor(private router:Router,private http:Http){}

  login(userName:String,password:String){
    if(userName != '' && password != '')
    {
      let o:any = {
        username:userName,
        password:password
      };
      console.log(o);



      this.token = '87dsqv87sqvqsd';
      /*this.http.get('http://localhost:9999/docteur/1').map(res => res.json()).subscribe(
        (result) =>{
          this.doctor = DoctorModel.createDoctor(result);
          this.token = '554dsdsfsd';
          this.router.navigate(['/doctor/patient-list']);
        },
        (error)=> {

        }
      )*/
    }
  }

  isAuthenticated(){
    return this.token != null;
  }

  logout(){
    this.token = null;
    this.router.navigate(['/secretary/auth']);
  }
}
