import {Component, OnInit} from "@angular/core";
import {PdfmakeService} from "ng-pdf-make";

@Component({
  selector : 'ng-example',
  templateUrl : 'pdf-test.component.html'
})
export class PdfTestComponent implements OnInit{
  // Inject pdfmake service
  constructor(private pdfmake: PdfmakeService) { }

  ngOnInit() {

    // Configure text styles
    this.pdfmake.configureStyles({ header: { fontSize: 18, bold: true } });

    // Add a text with style
    this.pdfmake.addText('This is a header, using header style', 'header');

    // Add simple text
    this.pdfmake.addText('This is an sample PDF printed with pdfMake');

    // Add large text
    this.pdfmake.addText('Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines');

    // Array with colums
    const columns = [
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.',
    ];

    // Add columns
    this.pdfmake.addColumns(columns);

    // List to add
    const list1 = ['item 1', 'item 2', 'item 3'];
    const list2 = ['item 1', 'item 2', 'item 3'];
    const list3 = ['item 1', 'item 2', 'item 3'];
    const list4 = ['item 1', 'item 2', 'item 3'];

    // Adding unordered list
    this.pdfmake.addUnorderedlist(list1);

    // Adding ordered list
    this.pdfmake.addOrderedList(list2);

    // Adding reversed oredered list
    this.pdfmake.addOrderedList(list3, true);

    // Adding ordered list starting at 50
    this.pdfmake.addOrderedList(list4, false, 50);

    // Add image from url
    this.pdfmake.addImage('http://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png');

    // Add image from url using custom width and height.
    this.pdfmake.addImage('http://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png', 300, 150);

    // Add image from localhost and using width
    this.pdfmake.addImage('http://localhost:4200/assets/daniel.jpg', 200);
  }
}
