
import {Component, ViewChild} from "@angular/core";
import {Select2OptionData} from "ng2-select2";
import {SymptomeService} from "../../../services/symptome.service";
import {SymptomeModel} from "../../../models/symptome.model";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {MedicamentModel} from "../../../models/medicament.model";
import {MedicamentService} from "../../../services/medicament.service";
import {ConsultationModel} from "../../../models/consultation.model";
import {ActivatedRoute} from "@angular/router";
import {OrdonanceModel} from "../../../models/ordonance.model";
import {PrescriptionModel} from "../../../models/prescription.model";
import {ConsultationsService} from "../../../services/consultations.service";

import * as jsPDF from 'jspdf';
import {MaladieModel} from "../../../models/maladie.model";
import {MaladieService} from "../../../services/maladie.service";
import {AuthDoctorService} from "../../../services/auth/auth-doctor.service";

@Component({
  selector : 'app-consultation-edit',
  templateUrl : 'consultation-edit.component.html'
})
export class ConsultationEditComponent{

  private consultation:ConsultationModel;

  private symptomes: SymptomeModel[] = [];
  private symptomesToShow: SymptomeModel[] = [];
  private symptomesConsultation: SymptomeModel[] = [];

  private medicaments:MedicamentModel[] = [];
  private medicamentsToShow:MedicamentModel[] = [];

  private maladie: MaladieModel[] = [];
  private maladieToShow: MaladieModel[] = [];
  private maladieConsultation: MaladieModel[] = [];

  private consultationForm;
  private showDataSymptome = false;
  private showDataMedicament = false;
  private showDataMaladie = false;
  @ViewChild('symptomeFilter') input;
  @ViewChild('medicamentFilter') inputMed;
  @ViewChild('maladieFilter') inputMaladie;
  constructor(private symptomeService:SymptomeService,
              private consultationService:ConsultationsService,
              private medicamentService:MedicamentService,
              private maladieService:MaladieService,
              private activatedRoute:ActivatedRoute,
              private authService:AuthDoctorService){}
  ngOnInit() {
    this.consultation = new ConsultationModel();
    this.getSymptome();
    this.getMedicament();
    this.getMaladie();
    this.initConsultation();
    this.initForm();

  }

  initForm(){
    let prescriptionForm = new FormArray([]);
    this.consultationForm = new FormGroup({
      'poid' : new FormControl(this.consultation.poid,Validators.required),
      'temperature' : new FormControl(this.consultation.temperature,Validators.required),
      'prescription' : prescriptionForm,
      'montant': new FormControl(this.consultation.montant_payee,Validators.required),
    })
  }

  getSymptome(){
    this.symptomeService.getSymptomes(this.authService.token).subscribe(
      (result) =>{

        for(let s of result){
          this.symptomes.push(new SymptomeModel(s.idSymptome,s.libele,s.description));
        }

      } ,
      (error) => {

      }
     )
  }

  getMedicament(){
    this.medicamentService.getMedicaments(this.authService.token).subscribe(
      (result) =>{
        for(let m of result){
          this.medicaments.push(new MedicamentModel(m.idMedicament,m.libelle,m.description));
        }
      } ,
      (error) => {

      }
    )
  }
  getMaladie(){
    this.maladieService.getMaladie(this.authService.token).subscribe(
      (result) =>{
        for(let m of result){
          this.maladie.push(new MaladieModel(m.idMaladie,m.libele,m.description));
        }
      } ,
      (error) => {

      }
    )
  }

  initConsultation() {
    this.consultation.idConsultation = this.activatedRoute.snapshot.params['idConsultation'];
    this.consultationService.getConsultations(this.consultation.idConsultation,this.authService.token).subscribe(
      (result) => {
        console.log(result);
        this.consultation = ConsultationModel.createConsultation(result);
        console.log(this.consultation);
        this.consultationForm.setValue({'poid' : this.consultation.poid,'temperature': this.consultation.temperature,'prescription': [] ,'montant':this.consultation.montant_payee});
        if(this.consultation.ordonnance != null){

          for ( let p of this.consultation.ordonnance.prescriptions )
          {
            (<FormArray>this.consultationForm.get('prescription')).push(new FormGroup({
              'medicament' : new FormGroup({
                'idMedicament': new FormControl(p.medicament.idMedicament),
                'libelle' : new FormControl(p.medicament.libelle),
                'description' : new FormControl(p.medicament.description)
              }),
              'quand' : new FormControl(p.quand,Validators.required),
              'quantite' : new FormControl(p.quantite,Validators.required),
              'nbrFois' : new FormControl(p.nbreFois,Validators.required),
              'periode' : new FormControl(p.periode,Validators.required),
            }));
          }
        }
      },
      (error) => {
        console.log(error);

      }
    );
  }

  onValidate(){

    this.consultation.idConsultation = this.activatedRoute.snapshot.params['idConsultation'];
    this.consultation.poid = this.consultationForm.value.poid;
    this.consultation.temperature = this.consultationForm.value.temperature;
    this.consultation.montant_payee = this.consultationForm.value.montant;
    this.consultation.ordonnance = new OrdonanceModel();

    //console.log(this.consultationForm.value);
    //delete this.consultation['dateConsultation'];
    delete this.consultation.ordonnance['idOrdonnance'];
    delete this.consultation.ordonnance['dateOrdonnace'];
    this.consultation.ordonnance.prescriptions =   PrescriptionModel.createArrayPrescrption(this.consultationForm.value.prescription);
    //console.log(this.consultationForm.value.prescription);
    //console.log(this.consultation);
    this.consultation.symptomes = this.symptomesConsultation;
    this.consultation.maladies = this.maladieConsultation;
    switch (this.consultation.etat)
    {
      case 0 :
        this.consultation.etat = 1;
        break;
      case 1 :
        this.consultation.etat = 2;
        break;
    }
    this.consultation.docteur = this.authService.getDoctor();
    console.log(this.consultation);
    let idDossier = this.activatedRoute.snapshot.params['id'];
    this.consultationService.editConsultation(idDossier,this.consultation,this.authService.token).subscribe(
      (result) => {
        console.log('result :');
        console.log(result);
      }
      ,
      (error) => {
        console.log(error);
      }
    )
  }

  onChange(){

      if(this.input.nativeElement.value == '') this.showDataSymptome = false;
      else {
        this.showDataSymptome = true;
        this.symptomesToShow = [];
        for(let s of this.symptomes){
          if(s.libele.toUpperCase().startsWith(this.input.nativeElement.value.toUpperCase()))
            this.symptomesToShow.push(s);
        }
      };
  }

  onSymptomeAdd(id: Number){
    let s: SymptomeModel = this.symptomes.find(x => x.idSymptome === id);

    if(s !== undefined)
      this.consultation.symptomes.push(s);
  }
  onMaladieAdd(id: Number){
    let s: MaladieModel = this.maladie.find(x => x.idMaladie === id);

    if(s !== undefined)
      this.consultation.maladies.push(s);
  }

  onDelete(id:Number){
      let i = this.consultation.symptomes.indexOf(this.consultation.symptomes.find(x => x.idSymptome === id));
      console.log(i);
      this.consultation.symptomes.splice(i,1);

  }

  onDeleteMed(id:Number){
      let i = this.consultation.maladies.indexOf(this.consultation.maladies.find(x => x.idMaladie === id));
      this.consultation.maladies.splice(i,1);

  }


  onAddPresc(){
    (<FormArray>this.consultationForm.get('prescription').controls).push(new FormGroup({
      'medicament' : new FormControl(),
      'par_jour' : new FormControl()
    }));
  }

  onAddSymptome(symptomeInput) {
      this.symptomeService.addSymptome(
        {
          description: "",
          libele: symptomeInput.value
        },this.authService.token
      ).subscribe(
        (result) =>{
          let s = new SymptomeModel(result.idSymptome,result.libele,result.description);
          this.symptomes.push(s);
          this.consultation.symptomes.push(s);
        },
        (error) => {
          console.log(error)
        }
      )
  }

  onAddMaladie(maladieInput) {
      this.maladieService.addMaladie(
        {
          description: "",
          libele: maladieInput.value
        },this.authService.token
      ).subscribe(
        (result) =>{
          let s = new MaladieModel(result.idMaladie,result.libele,result.description);
          this.maladie.push(s);
          this.maladieConsultation.push(s);
        },
        (error) => {
          console.log(error)
        }
      )
  }

  onChangeMedicament() {
    if(this.inputMed.nativeElement.value == '') this.showDataMedicament = false;
    else {
      this.showDataMedicament = true;
      this.medicamentsToShow = [];
      for(let s of this.medicaments){
        if(s.libelle.toUpperCase().startsWith(this.inputMed.nativeElement.value.toUpperCase()))
          this.medicamentsToShow.push(s);
      }
    }
  }
  onChangeMaladie() {
    console.log(this.inputMaladie.nativeElement.value);
    if(this.inputMaladie.nativeElement.value == '') this.showDataMaladie = false;
    else {
      this.showDataMaladie = true;
      this.maladieToShow = [];
      for(let s of this.maladie){
        if(s.libele.toUpperCase().startsWith(this.inputMaladie.nativeElement.value.toUpperCase()))
          this.maladieToShow.push(s);
      }
    }
  }

  onAddMedicament(idMedicament: Number,nameMed:String,descMed:String) {
    let m: MedicamentModel = this.medicaments.find(x => x.idMedicament === idMedicament);
    console.log(m);
    if(m !== undefined)
    {
      (<FormArray>this.consultationForm.get('prescription')).push(new FormGroup({
        'medicament' : new FormGroup({
          'idMedicament': new FormControl(idMedicament),
          'libelle' : new FormControl(nameMed),
          'description' : new FormControl(descMed)
        }),
        'quand' : new FormControl(null,Validators.required),
        'quantite' : new FormControl(null,Validators.required),
        'nbrFois' : new FormControl(null,Validators.required),
        'periode' : new FormControl(null,Validators.required),
      }));
    }
  }

  onDownload() {
    const doc = new jsPDF();
    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.text('Nom du patient :', 10,10);
    doc.text('........................................', 50,10);


    doc.text('Prescription:', 10,20);


    doc.text('Nom Med', 10,30);
    doc.text('Nombre fois', 50,30);
    doc.text('Periode', 80,30);
    doc.text('Qte', 110,30);
    doc.text('Quand', 120,30);
    doc.setFontType("normal");
    let y = 40;
    for(let p of this.consultationForm.value.prescription){
      doc.text(p.medicament.libelle + '', 10,y);
      doc.text(p.nbreFois + '', 50,y);
      doc.text(p.periode + '', 80,y);
      doc.text(p.quantite + '', 110,y);
      doc.text(p.quand+ '', 140,y);
      y += 10;
    }


    doc.save('Test.pdf');
  }
}
