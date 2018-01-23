


import {Component, OnInit} from "@angular/core";
import {ConsultationDistService} from "../../../services/consultation-dist.service";
import {ConsultationDistanceModel} from "../../../models/ConsultationDistance.model";
import {PatientModel} from "../../../models/patient.model";

@Component({
  selector:'cons-doctor',
  templateUrl : 'cons-doctor.component.html'
})
export class ConsDoctorComponent implements OnInit{


  consultation : ConsultationDistanceModel[][]=[];
  consSelected:ConsultationDistanceModel[];
  patients:PatientModel[]= [];

  constructor(private consService:ConsultationDistService){}


  ngOnInit(): void {
      this.consService.getByDoctor(1).subscribe(
        (result) =>{
          for(let c of result) {
            if(this.patients.find(p => p.idPersonne == c.patient.idPersonne) == null)
              this.patients.push(PatientModel.createPatient(c.patient));
          }

          let i = 0;
          for(let p of this.patients) {
            this.consultation[i]=[];
            for(let c of result) {
                if(p.idPersonne == c.patient.idPersonne)
                  this.consultation[i].push(ConsultationDistanceModel.createConsultation(c));
            }
            i++;
          }


          console.log(result);
          console.log(this.patients);
          console.log(this.consultation);
        },
        (error ) => {

        }
      )

  }

  onConClick(idPersonne: Number) {
    console.log(idPersonne);
    let i = 0;

    this.consSelected = this.consultation[0];
  }

  onSendMessage(value){

  }
}
