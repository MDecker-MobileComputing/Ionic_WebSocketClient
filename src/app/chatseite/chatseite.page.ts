import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RxStompService } from '../rx-stomp.service';
import { Subscription } from 'rxjs';
import { HelferleinService } from '../helferlein.service';
import { AlertController, NavController } from '@ionic/angular';


/**
 * Seite für den Chat-Verlauf.
 */
@Component({
  selector: 'app-chatseite',
  templateUrl: './chatseite.page.html',
  styleUrls: ['./chatseite.page.scss'],
})
export class ChatseitePage implements OnInit, OnDestroy {

  /** Name Chat-Kanal, wird mit Interpolation auf UI angezeigt */
  public kanalname: string | null = "";

  /** Nickname Chat-Teilnehmer, wird mit Interpolation auf UI angezeigt */
  public nickname: string | null = "";

  /** Objekt mit Abonnement von WebSocket/STOMP */
  private abonnement: Subscription | null = null;

  /** Array mit Kanalnachrichten, die über STOMP empfangen wurden */
  public beitragArray: any[] = [];

  /** Eingabe Nachricht, die auf Chat zu schreiben ist */
  public eingabeText = "";

  /** Vollständiger Kanal, "/topic/unterhaltung/testkanal" */
  private subscribeTopic = "";


  /**
   * Konstruktor für Auslesen der URL-Parameter.
   */
  constructor( private activatedRoute: ActivatedRoute,
               private stompService  : RxStompService,
               private helferlein    : HelferleinService,
               private alertCtrl     : AlertController,
               private navCtrl       : NavController ) {   

    this.kanalname = activatedRoute.snapshot.queryParamMap.get( "kanalname" );
    this.nickname  = activatedRoute.snapshot.queryParamMap.get( "nickname"  );
  }


  /**
   * Event-Handler wird aufgerufen, wenn die Seite initialisiert wurde.
   */  
  ngOnInit() {

    this.subscribeTopic = `/topic/unterhaltung/${this.kanalname}`;

    this.abonnement = 
          this.stompService.rxStomp
              .watch({ destination: this.subscribeTopic })
              .subscribe( (message) => this.onNachrichtEmpfangen( message )  );    
  }  


  /**
   * Event-Handler für über STOMP empfangene Chat-Nachricht.
   * 
   * @param message Empfangene Nachricht
   */  
  private onNachrichtEmpfangen( message: any ): void {

    const jsonPayload = message.body;
    const payload     = JSON.parse( jsonPayload );

    console.log( `Nachricht empfangen von "${payload.nickname}": ${payload.nachricht}` );
    //console.log( "Nachricht empfangen :" + jsonPayload );

    this.beitragArray.push( payload );
  }


  /**
   *  Event-Handler für Klick auf "Absenden"-Button.
   */
  public onBeitragSenden() {

    const eingabeNorm = this.eingabeText.trim();
    if ( eingabeNorm.length === 0 ) {
      
      this.helferlein.zeigeToast( "Leere Nachricht kann nicht als Beitrag versendet werden." );
      return;
    }

    const payloadObj = { nickname : this.nickname,      
                         nachricht: eingabeNorm };
                       
    const payloadString = JSON.stringify( payloadObj );

    this.stompService.rxStomp.publish({ destination: this.subscribeTopic, 
                                        body       : payloadString });

    console.log( "Payload mit Beitrag verschickt: " + payloadString );    

    this.eingabeText = "";
  }


  /**
   * Event-Handler wird aufgerufen, wenn die Seite beendet wird.
   */  
  ngOnDestroy() {

    console.log( "Seite für Chat wird zerstört." );

    if ( this.abonnement ) {

        this.abonnement.unsubscribe();
        console.log( "Abonnement von STOMP-Topic für Chat beendet" );
    }    
  }

  /**
   * Event-Handler für Klick auf "Verlassen"-Button.
   * Nach positive Bestätigung wird die App beendet.
   */
  public async onVerlassen() {

    const alert = await this.alertCtrl.create({
      header: "Chat verlassen?",
      message: "Möchten Sie den Chat wirklich verlassen?",
      buttons: [
        {
          text: "Abbrechen",
          role: "cancel"
        }, {        
          text: "Ja",
          handler: () => { this.navCtrl.navigateBack( "/seite3" ); }                      
        }]      
    });

    await alert.present();
  }  

}
