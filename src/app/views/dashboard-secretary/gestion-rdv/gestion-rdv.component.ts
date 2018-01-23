
import {Component, OnInit, ViewChild} from "@angular/core";
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import {RendezvousService} from "../../../services/rendezvous.service";
import {RendeVousModel} from "../../../models/rendeVous.model";
import {Subject} from "rxjs/Subject";
import {DoctorModel} from "../../../models/doctor.model";
import {DocteurService} from "app/services/docteur.service";
import {AuthSecretatyService} from "../../../services/auth/auth-secretaty.service";

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector:'gestion-rdv',
  templateUrl :'gestion-rdv.component.html'
})
export class GestionRdvComponent implements OnInit{


  constructor(private rendezvousService:RendezvousService, private doctorService:DocteurService,private authService:AuthSecretatyService){

  }

  ngOnInit(): void {
    this.rdvArrayDay = [];
    this.rendezvousService.getAllRendezVous(this.authService.token).subscribe(
      (result) => {
        this.rdvArray = [];
        for(let r of result){
          this.rdvArray.push(RendeVousModel.createRendezVous(r));
        }

        this.events =  this.convertToEvent(this.rdvArray);
        //console.log(this.events);
        this.refresh.next();
        this.doctorService.getAllDoctor(this.authService.token).subscribe(
          (result) => {
            this.docteurs = [];
            for(let r of result){
              this.docteurs.push(DoctorModel.createDoctor(r));

            }
            console.log(this.docteurs);
            this.events = this.convertToEvent(this.getArrayRdvBydoctor(this.docteurs[0].idPersonne));
            this.rdvArrayDay = this.getArrayRdvBydoctor(this.docteurs[0].idPersonne).filter(rdv => this.isDateEqual(rdv.date,new Date()));
            console.log(this.rdvArrayDay);
          },
          (error) => {

          }
        )
      },
      (error) => {
        console.error(error);
      }
    )
  }

  viewDate: Date = new Date();
  view: string = 'month';
  refresh: Subject<any> = new Subject();
  rdvArray:RendeVousModel[];
  rdvArrayDay:RendeVousModel[];
  docteurs:DoctorModel[];
  isPast = false;
  @ViewChild('doctorSelect') doctorSelect ;
  events: CalendarEvent[] = [

  ];
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        console.log('hello');
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        console.log('hello');
      }
    }
  ];

  convertToEvent(rdvArray:RendeVousModel[]){
    let events:CalendarEvent[] = [];

    for(let r of rdvArray){
      let e = {
          start : startOfDay(r.date) ,
          end : startOfDay(r.date),
          title : r.patient.nom + ' ' + r.patient.prenom,
          color:null
      };

      switch(r.etat){
        case 0 :
          e.color = colors.yellow;
          break;
        case 1 :
          e.color = colors.blue;
          break;
        case 2 :
          e.color = colors.red;
          break;

      }


      events.push(e);
    }
    return events;
  }

  onDayClick($event) {
    this.rdvArrayDay =  this.getArrayRdvBydoctor(this.doctorSelect.nativeElement.value).filter(rdv => this.isDateEqual(rdv.date,$event.day.date))
    this.viewDate = $event.day.date;
    this.refresh.next();
    console.log($event);
    console.log(this.doctorSelect.nativeElement.value);
    this.isPast = $event.day.isPast;
    console.log(this.isPast);
  }

  onChangeDoctor(value) {
    this.events = this.convertToEvent(this.getArrayRdvBydoctor(value));
    this.refresh.next();
  }

  getArrayRdvBydoctor(idDoctor : Number){
    return this.rdvArray.filter(rdv => rdv.docteur.idPersonne == idDoctor);
  }

  isDateEqual(d1:Date, d2: Date){
    d1.setHours(0,0,0,0);
    d2.setHours(0,0,0,0);
    return d1.getTime() == d2.getTime();
  }

  onValidateRdv(idRendezVous) {

    let rdv = this.rdvArrayDay.find(rdv => rdv.idRendezVous == idRendezVous);
    rdv.etat = 1;

    let rdvO = this.rdvArray.find(rdv => rdv.idRendezVous == idRendezVous);
    rdvO.etat = 1;

    console.log(rdvO);
    this.rendezvousService.updateRendezVous(rdv,this.authService.token).subscribe(
      (result) => {
        this.updateCalendar()
      },
      (error) => {

      }
    );

  }

  onCancelRdv(idRendezVous: Number) {
    let rdv = this.rdvArrayDay.find(rdv => rdv.idRendezVous == idRendezVous);
    rdv.etat = 2;
    let rdvO = this.rdvArray.find(rdv => rdv.idRendezVous == idRendezVous);
    rdvO.etat = 2;


    this.rendezvousService.updateRendezVous(rdv,this.authService.token).subscribe(
      (result) => {
        this.updateCalendar()
      },
      (error) => {

      }
    );
  }

  getOnwaitRdv(){
    return this.rdvArrayDay.filter(r => r.isOnwait());
  }
  getValidRdv(){
    return this.rdvArrayDay.filter(r => r.isValid());
  }
  getCancelRdv(){
    return this.rdvArrayDay.filter(r => r.isCancel());
  }

  updateCalendar(){
    this.events = this.convertToEvent(this.rdvArray);
    this.refresh.next();
  }
}
