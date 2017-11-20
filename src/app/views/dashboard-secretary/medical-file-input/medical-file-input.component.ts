

import {Component, OnInit} from "@angular/core";
import {PatientModel} from "../../../models/patient.model";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {SexService} from "../../../services/sex.service";
import {Ref_sexModel} from "../../../models/ref_sex.model";
import {PatientService} from "../../../services/patient.service";

@Component({
  selector:'app-medical-file-input',
  templateUrl:'medical-file-input.component.html'
})
export class MedicalFileInputComponent implements OnInit{
  medicalFileForm;
  sexForm:Ref_sexModel[] = [];

  constructor(private sexService:SexService,private  patientService:PatientService){}

  ngOnInit(): void {
    this.sexService.getGender().subscribe(
      (result) => {
        console.log(result);
        for (let s of result){
          this.sexForm.push(new Ref_sexModel(s.idSexe,s.libelle));
        }
      },
      error => console.log(error) );


    this.medicalFileForm = new FormGroup({
      nom : new FormControl(null,Validators.required),
      prenom:new FormControl(),
      cin:new FormControl(),
      email:new FormControl(),
      telephone:new FormControl(),
      dateNaissance:new FormControl(),
      sex: new FormControl(),
    });
    console.log(this.sexForm);
  };

  onSubmit(){
    let refSex = this.sexForm.find(o => o.idSexe === this.medicalFileForm.value.sex);

    let patient = new PatientModel(
      this.medicalFileForm.value.nom,
      this.medicalFileForm.value.cin,
      this.medicalFileForm.value.prenom,
      this.medicalFileForm.value.telephone,
      this.medicalFileForm.value.email,
      this.medicalFileForm.value.dateNaissance,
      refSex
    );
    console.log(patient);
    this.patientService.addPatient(patient).subscribe((result)=>{
      console.log(result);
    },error => console.log(error) );
  }

  onReset(){
    this.medicalFileForm.reset();
  }

}
