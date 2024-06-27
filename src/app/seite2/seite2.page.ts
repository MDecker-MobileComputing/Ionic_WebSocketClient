import { Component } from '@angular/core';
import { RxStompService } from '../rx-stomp.service';
import { Subscription } from 'rxjs';
import { HelferleinService } from '../helferlein.service';

/**
 * Seite für Vokalersetzung über WebSockets/STOMP.
 */
@Component({
  selector: 'app-seite2',
  templateUrl: './seite2.page.html',
  styleUrls: ['./seite2.page.scss'],
})
export class Seite2Page {

  /** Objekt mit Abonnement 1 von WebSocket/STOMP */
  private abonnementOutput: Subscription | null = null;

  /** Objekt mit Abonnement 2 von WebSocket/STOMP */
  private abonnementFehler: Subscription | null = null;

  /** Über Two-Way-Binding an <ion-input>-Element gebunden */
  public eingabeText: string = "";


  /**
   * Konstruktor für *Dependency Injection*.
   */
  constructor( private stompService: RxStompService,
               private helferlein  : HelferleinService ) {}

  /**
   * Event-Handler wird aufgerufen, wenn die Seite angezeigt wird.
   */
  ionViewDidEnter() {

      this.abonnementOutput =
              this.stompService.rxStomp
                               .watch({ destination: "/user/queue/vokalersetzungs_output" })
                               .subscribe( (message) => this.ergebnisEmpfangen( message )  );

      this.abonnementFehler =
              this.stompService.rxStomp
                               .watch({ destination: "/user/queue/vokalersetzungs_fehler" })
                               .subscribe( (message) => this.fehlerEmpfangen( message ) );

      console.log( "STOMP-Topics für Output und Fehler abonniert!" );
  }


  /**
   * Event-Handler für über STOMP empfangenes Vokalersetzungsergebnis.
   *
   * @param message Empfangene Nachricht
   */
  private ergebnisEmpfangen( message: any ): void {

    this.helferlein.zeigeDialog( "Übersetzungsergebnis", message.body );
  }


  /**
   * Event-Handler für über STOMP empfangene Fehlermeldung.
   *
   * @param message Empfangene Nachricht
   */
  private fehlerEmpfangen( message: any ): void {

    this.helferlein.zeigeDialog( "Fehlermeldung", message.body );
  }


  /**
   * Event-Handler wird aufgerufen, wenn die Seite verlassen wird.
   */
  ionViewWillLeave()  {

      console.log( "Seite für Vokalersetzung wird zerstört." );

      if ( this.abonnementOutput ) {

          this.abonnementOutput.unsubscribe();
          console.log( "Abonnement von STOMP-Topic \"Output\" beendet." );
      }
      if ( this.abonnementFehler ) {

          this.abonnementFehler.unsubscribe();
          console.log( "Abonnement von STOMP-Topic \"Fehler\" beendet." );
      }
  }


  /**
   * Event-Handler für Button für "Unwandeln".
   */
  public onUmwandelnButton( zielvokal: string ) {

      const eingabe = this.eingabeText.trim();
      if ( eingabe.length === 0 ) {

          this.helferlein.zeigeDialog( "Ungültige Eingabe",
                                       "Bitte geben Sie einen Text ein!" );
          return;
      }

      const payloadObjekt = { text : this.eingabeText, vokal: zielvokal };

      const payloadString = JSON.stringify( payloadObjekt );

      this.stompService.rxStomp.publish({ destination: "/app/vokalersetzung_input",
                                          body       : payloadString });

      console.log( "Nachricht gesendet: " + payloadString );
  }


  /**
   * Event-Handler für Button für "Zurücksetzen".
   */
  public onZuruecksetzenButton() {

      this.eingabeText = "";
  }

}
