import {Component, Input, OnInit} from "@angular/core";
import {PdfmakeService} from "ng-pdf-make";

@Component({
  selector : 'ng-example',
  templateUrl : 'pdf-test.component.html'
})
export class PdfTestComponent implements OnInit{
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }


}
