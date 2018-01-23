
import {Component, HostListener, OnInit, ViewChild} from "@angular/core";
import {DocteurService} from "../../../services/docteur.service";
import {DoctorModel} from "../../../models/doctor.model";
import {RendezvousService} from "../../../services/rendezvous.service";
import {RendeVousModel} from "../../../models/rendeVous.model";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {AuthSecretatyService} from "../../../services/auth/auth-secretaty.service";

@Component({
  selector:'gestion-cabinet',
  templateUrl: 'gestion-cabinet.component.html'
})
export class GestionCabinetComponent implements OnInit{

  constructor(private doctorService:DocteurService, private rendezVousService:RendezvousService,private authService:AuthSecretatyService){

  }

  docteurs:DoctorModel[] = [];
  rendezVous:RendeVousModel[] = [];
  allrendezVous:RendeVousModel[] = [];
  @ViewChild('doctorSelect') doctorSelect ;
  private serverUrl = 'http://localhost:9999/socket';
  private stompClient;


  ngOnInit(): void {
    this.initializeWebSocketConnection();
    this.doctorService.getAllDoctor(this.authService.token).subscribe(
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

            this.rendezVous = this.getArrayRdvBydoctor(this.docteurs[0].idPersonne);
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



  onArrviePatient(idRendezVous: Number) {
    let rdv = this.rendezVous.find(r => r.idRendezVous ==idRendezVous);
    rdv.etatActuel = 1;
    this.rendezVousService.updateRendezVous(rdv,this.authService.token).subscribe(
      (result) => {
          this.sendMessage(rdv);
      },
      (error)=>{}
    )
  }

  onActifRendezVous(idRendezVous: Number) {
    let rdv = this.rendezVous.find(r => r.idRendezVous ==idRendezVous);
    rdv.etatActuel = 2;
    this.rendezVousService.updateRendezVous(rdv,this.authService.token).subscribe(
      (result) => {
        this.sendMessage(rdv);
      },
      (error)=>{}
    )
  }
  onEndRendezVous(idRendezVous: Number) {
    let rdv = this.rendezVous.find(r => r.idRendezVous ==idRendezVous);
    rdv.etatActuel = 3;
    this.rendezVousService.updateRendezVous(rdv,this.authService.token).subscribe(
      (result) => {
        this.sendMessage(rdv);
      },
      (error)=>{}
    )
  }

  onAbsentPatient(idRendezVous: Number) {
    let rdv = this.rendezVous.find(r => r.idRendezVous ==idRendezVous);
    rdv.etatActuel = 4;
    this.rendezVousService.updateRendezVous(rdv,this.authService.token).subscribe(
      (result) => {
        this.sendMessage(rdv);
      },
      (error)=>{}
    )
  }

  onChangedoctor(value) {
    this.rendezVous = this.getArrayRdvBydoctor(value);
  }

  sendMessage(rdv:RendeVousModel){
    this.stompClient.send("/app/send/message" , {}, JSON.stringify(rdv));
  }


}
