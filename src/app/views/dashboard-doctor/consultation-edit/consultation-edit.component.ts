
import {Component, ViewChild} from "@angular/core";
import {Select2OptionData} from "ng2-select2";
import {SymptomeService} from "../../../services/symptome.service";
import {SymptomeModel} from "../../../models/symptome.model";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {MedicamentModel} from "../../../models/medicament.model";
import {MedicamentService} from "../../../services/medicament.service";

@Component({
  selector : 'app-consultation-edit',
  templateUrl : 'consultation-edit.component.html'
})
export class ConsultationEditComponent{
  private symptomes: SymptomeModel[] = [];
  private symptomesToShow: SymptomeModel[] = [];
  private symptomesConsultation: SymptomeModel[] = [];

  private medicaments:MedicamentModel[] = [];
  private medicamentsToShow:MedicamentModel[] = [];


  private consultationForm;
  private showDataSymptome = false;
  private showDataMedicament = false;
  @ViewChild('symptomeFilter') input;
  @ViewChild('medicamentFilter') inputMed;
  constructor(private symptomeService:SymptomeService, private medicamentService:MedicamentService){}
  ngOnInit() {
    this.getSymptome();
    this.getMedicament();
    this.initForm()
    console.log(this.medicaments)
  }

  initForm(){
    let prescriptionForm = new FormArray([]);
    /*prescriptionForm.push(new FormGroup({
      'medicament' : new FormGroup({
          'id': new FormControl(),
          'name' : new FormControl()
      }),
      'par_jour' : new FormControl()
    }));
  */
    this.consultationForm = new FormGroup({
      'poid' : new FormControl(null,Validators.required),
      'temperature' : new FormControl(null,Validators.required),
      'prescription' : prescriptionForm
    })
  }

  getSymptome(){
    this.symptomeService.getSymptomes().subscribe(
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
    this.medicamentService.getMedicaments().subscribe(
      (result) =>{
        for(let m of result){
          this.medicaments.push(new MedicamentModel(m.idMedicament,m.libelle,m.description));
        }
      } ,
      (error) => {

      }
    )
  }

  onValidate(){
    console.log(this.consultationForm.value);
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
    console.log(s);
    if(s !== undefined)
      this.symptomesConsultation.push(s);
  }

  onDelete(id:Number){
      let i = this.symptomesConsultation.indexOf(this.symptomesConsultation.find(x => x.idSymptome === id));
      console.log(i);
      this.symptomesConsultation.splice(i,1);

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
        }
      ).subscribe(
        (result) =>{
          let s = new SymptomeModel(result.idSymptome,result.libele,result.description);
          this.symptomes.push(s);
          this.symptomesConsultation.push(s);
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
        if(s.libele.toUpperCase().startsWith(this.inputMed.nativeElement.value.toUpperCase()))
          this.medicamentsToShow.push(s);
      }
    };
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
}
