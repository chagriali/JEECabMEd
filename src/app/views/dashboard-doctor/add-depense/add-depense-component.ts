

import {Component, OnInit} from "@angular/core";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {DepensesService} from "../../../services/depenses.service";
import {DepensesModel} from "../../../models/depenses.model";

@Component({
  selector:'add-depense',
  templateUrl:'add-depense.component.html'
})
export class AddDepenseComponent implements OnInit{
  DepenseForm;
  constructor(private depenseSerivce:DepensesService){}

  ngOnInit(): void {
    this.DepenseForm = new FormGroup({
      description : new FormControl(),
      montant:new FormControl(null,Validators.required)
    });
  };

  onSubmit(){

    let depense = new DepensesModel(
      null,
      null,
      this.DepenseForm.value.description,
      this.DepenseForm.value.montant,
    );

    this.depenseSerivce.addDepense(depense).subscribe((result)=>{
      console.log(result);
    },error => console.log(error) );
  }

  onReset(){
    this.DepenseForm.reset();
  }

}
