import { Injectable } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';


/**
 * https://www.npmjs.com/package/@stomp/rx-stomp
 * https://stomp-js.github.io/guide/rx-stomp/rx-stomp-with-angular.html
 * https://stomp-js.github.io/api-docs/latest/classes/RxStomp.html
 */
@Injectable({
  providedIn: 'root'
})
export class RxStompService  {

    public rxStomp: RxStomp;

    /**
     * RxStomp-Objekt erzeugen und konfigurieren
     */
    constructor() {

        console.log( "Versuche STOMP-Client zu starten..." );

        this.rxStomp = new RxStomp();
        this.rxStomp.configure({
            brokerURL: "ws://websocket-backend-07e2f5daf03b.herokuapp.com/mein_ws",
            //brokerURL: "ws://localhost:8080/mein_ws",
            debug: (str) => console.debug( "STOMP DEBUG:", str ),
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            logRawCommunication: false
        });

        this.rxStomp.activate();
        console.log( "STOMP-Client gestartet!" );

        /*
        setTimeout(() => {
            console.log("Versuche jetzt STOMP-Topic zu abonnieren...");
            this.rxStomp
                .watch({ destination: "/topic/schlagzeilen" })
                .subscribe((message) => console.log(message.body));
        }, 3000); // Verzögerung von 3000 Millisekunden (3 Sekunden)
        */
    }

}
