

import {Component, OnInit, ViewChild} from "@angular/core";
import {DocteurService} from "../../../services/docteur.service";
import {RendezvousService} from "../../../services/rendezvous.service";
import {DoctorModel} from "../../../models/doctor.model";
import {RendeVousModel} from "../../../models/rendeVous.model";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

@Component({
  selector:'cabinet',
  templateUrl:'cabinet.component.html'
})
export class CabinetComponent implements OnInit{
  constructor(private doctorService:DocteurService, private rendezVousService:RendezvousService){

  }

  docteurs:DoctorModel[] = [];
  rendezVous:RendeVousModel[] = [];
  allrendezVous:RendeVousModel[] = [];
  @ViewChild('doctorSelect') doctorSelect ;
  private serverUrl = 'http://localhost:9999/socket'
  private stompClient;

  ngOnInit(): void {
    this.initializeWebSocketConnection();
    this.doctorService.getAllDoctor().subscribe(
      (result) => {
        this.docteurs = [];
        for(let r of result){
          this.docteurs.push(DoctorModel.createDoctor(r));
        }
        let date:Date = new Date(Date.now()) ;
        console.log(date.getFullYear());

        console.log(date.getUTCDate());
        this.rendezVousService.getRendezVousByDate(date.getFullYear(),date.getMonth()+1,date.getUTCDate()).subscribe(
          (result) => {
            for(let r of result){
              this.allrendezVous.push(RendeVousModel.createRendezVous(r));
            }

            this.rendezVous = this.getArrayRdvBydoctor(this.docteurs[0].idPersonne)
            console.log(this.rendezVous);

          },
          (error) => {

          }
        );

      },
      (error) => {

      }
    );
  }



  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe("/cabinet", (message) => {
        if(message.body){
          let rdv:RendeVousModel;
          rdv = JSON.parse(message.body);
          that.changeRdv(rdv);
          console.log(rdv);
          console.log(that.allrendezVous);
          that.rendezVous = that.getArrayRdvBydoctor(that.doctorSelect.nativeElement.value);
        }
      });
    });
  }


  getArrayRdvBydoctor(idDoctor : Number){
    return this.allrendezVous.filter(rdv => rdv.docteur.idPersonne == idDoctor);
  }


  getRendezvousfortheday(){
    return this.rendezVous.filter(rdv => rdv.etatActuel == 0);
  }

  getRendezvousarrive(){
    return this.rendezVous.filter(rdv => rdv.etatActuel == 1);
  }

  getRendezvousactif(){
    return this.rendezVous.filter(rdv => rdv.etatActuel == 2);
  }

  getRendezvousfini(){
    return this.rendezVous.filter(rdv => rdv.etatActuel == 3);
  }

  getRendezvousabsent(){
    return this.rendezVous.filter(rdv => rdv.etatActuel == 4);
  }

  onChangedoctor(value) {
    this.rendezVous = this.getArrayRdvBydoctor(value);
  }

  changeRdv(rdv:RendeVousModel){
    let index = this.allrendezVous.findIndex( e => e.idRendezVous == rdv.idRendezVous);
    console.log(index);
    this.allrendezVous.splice(index,1,rdv);
    /*

    let r = this.allrendezVous.find( e => e.idRendezVous == rdv.idRendezVous);
    r = rdv;*/
  }
}
