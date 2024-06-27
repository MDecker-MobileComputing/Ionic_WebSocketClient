import { Component, OnInit, OnDestroy } from '@angular/core';
import { RxStompService } from '../rx-stomp.service';
import { Subscription } from 'rxjs';


/**
 * Seite, um Schlagzeilen über WebSockets/STOMP zu empfangen
 * und in Liste anzuzeigen.
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  /** Array mit den via WebSocket/STOMP empfangenen Schlagzeilen. */
  public schlagzeilenArray: string[] = [];

  /** Objekt mit Abonnement von WebSocket/STOMP */
  private abonnement: Subscription | null = null;


  /**
   * Konstruktor für Dependency Injection
   */
  constructor( private stompService: RxStompService ) {}


  /**
   * Event-Handler wird aufgerufen, wenn die Seite zur Anzeige gebracht wird.
   */
  ionViewDidEnter() {

      this.abonnement =
              this.stompService.rxStomp
                               .watch({ destination: "/topic/schlagzeilen" })
                               .subscribe( (message) => this.nachrichtEmpfangen( message ) );
      console.log( "STOMP-Topic abonniert!" );
  }


  /**
   * Event-Handler wird aufgerufen, wenn die Seite zerstört wird:
   * STOMP-Topic-Abonnement beenden.
   */
  ionViewWillLeave() {

      if ( this.abonnement ) {

        this.abonnement.unsubscribe();
        console.log( "Abonnement von STOMP-Topic beendet." );
      }
  }


  /**
   * Event-Handler für über STOMP empfangene Schlagzeile.
   *
   * @param message Empfangene Nachricht
   */
  private nachrichtEmpfangen( message: any ): void {

      const jsonPayload = message.body;

      const payload     = JSON.parse( jsonPayload );
      const schlagzeile = payload.schlagzeile;
      const istInland   = payload.istInland;

      console.log( `Nachricht empfangen: "${schlagzeile}", istInland=${istInland}` );
      const schlagzeileMitHerkunft = istInland ? `[Inland] ${schlagzeile}` : `[Ausland] ${schlagzeile}`;
      this.schlagzeilenArray.push( schlagzeileMitHerkunft );
  }

}
