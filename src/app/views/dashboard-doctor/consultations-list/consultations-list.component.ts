import {Component, OnInit} from "@angular/core";
import {ConsultationsService} from "../../../services/consultations.service";
import {ConsultationModel} from "../../../models/consultation.model";
import {SymptomeModel} from "../../../models/symptome.model";
import {DoctorModel} from "../../../models/doctor.model";


@Component({
  selector : 'doctor-consultations-list',
  templateUrl : 'consultations-list.component.html'
})
export class ConsultationsListComponent implements OnInit{

  constructor(private  consultationsService:ConsultationsService){}
  consultations:ConsultationModel[] = [];
  ngOnInit(): void {
    this.consultationsService.getConsultations(1).subscribe(
      (result)=>{
        /*let consultations:ConsultationModel[] = [];
        let c : ConsultationModel;
        for (let cons of result){
          c = new ConsultationModel(cons.id_consultation,cons.date_consultation,cons.duree,
           DoctorModel.createDoctor(cons.docteur),cons.poids,cons.temperature);
          let symptomes: SymptomeModel[]=[];
          for(let s of cons.symptomes){
            symptomes.push(SymptomeModel.createSymptome(s));
          }
          c.symptomes=symptomes;
          consultations.push(c);
        }
        this.consultations = consultations;
        console.log(this.consultations);*/
      }
      ,
      (error)=>{
        console.log(error);
      }
    );

  }
}
