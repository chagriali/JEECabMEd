import {Component, OnInit} from "@angular/core";
import {DossierService} from "../../../services/dossier.service";
import {DossierModel} from "../../../models/dossier.model";
import {PatientModel} from "../../../models/patient.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ConsultationModel} from "../../../models/consultation.model";
import {ConsultationsService} from "../../../services/consultations.service";
import {AuthDoctorService} from "../../../services/auth/auth-doctor.service";

@Component({
  selector : 'doctor-patient-detail',
  templateUrl : 'detail-patient.component.html'
})
export class DoctorDetailPatientComponent implements OnInit{

  constructor(private dossierService:DossierService,
              private consultationService:ConsultationsService,
              private activatedRoute:ActivatedRoute,
              private router:Router,
              private authService:AuthDoctorService){}
  dossier : DossierModel;
  ngOnInit(): void {
    this.dossierService.getDossierPatient(this.activatedRoute.snapshot.params['id'],this.authService.token).subscribe(
      (result)=>{
        console.log(result)
          this.dossier = (new DossierModel(result.idDossierMedical,new Date(result.dateCreation),PatientModel.createPatient(result.patient)));
          let consultations: ConsultationModel[]=[];
          for(let c of result.consultations){
            consultations.push(ConsultationModel.createConsultation(c));
          }
          this.dossier.consultations=consultations;

        console.log(this.dossier);
      }
      ,
      (error)=>{
        console.log(error);
      }
    );
  }


  onNewConsultation(){
    this.consultationService.addConsultation(this.activatedRoute.snapshot.params['id'],{},this.authService.token).subscribe(
      (result) => {
        console.log('result' + result);
        this.router.navigate(['consultation',result],{relativeTo:this.activatedRoute});
      },
      (error) => {
        console.log(error);
      },
    )
  }
}
