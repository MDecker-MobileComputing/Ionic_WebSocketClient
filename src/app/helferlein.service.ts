import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';


/**
 * Service-Klasse mit Hilfsmethoden.
 */
@Injectable({
  providedIn: 'root'
})
export class HelferleinService {

  /**
   * Konstruktor für *Dependency Injection*.
   */
  constructor( private alertCtrl: AlertController,
               private toastCtrl: ToastController ) { }   


  /**
   * Hilfsmethode zum Anzeigen eines Dialogs.
   * 
   * @param titel Titel für Dialog
   * 
   * @param nachricht Text für Dialog
   */
  async zeigeDialog( titel: string, nachricht: string ) {

    const meinAlert =
          await this.alertCtrl.create({
              header  : titel,
              message : nachricht,
              buttons : [ "Ok" ]
          });

    await meinAlert.present();
  }
  

  /**
   * Hilfsmethode zum Anzeigen eines Toasts.
   * 
   * @param nachricht Nachricht für Dialog
   */
  async zeigeToast( nachricht: string ) {

    const toast = await this.toastCtrl.create({
      message: nachricht,
      duration: 2000
    });

    toast.present();    
  }


  /**
   * Cookie auslesen.
   * 
   * @param name Name von Cookie
   * 
   * @returns Wert von Cookie mit `name` oder `null`, falls nicht vorhanden
   */
  public leseCookie( name: string ): string | null {

    const nameEQ = name + "=";
    const ca     = document.cookie.split( ";" );

    for( let i=0; i < ca.length; i++ ) {

        let c = ca[i];
        while ( c.charAt(0)== ' ' ) {

          c = c.substring( 1, c.length );
        }

        if ( c.indexOf( nameEQ ) == 0 ) {

          return c.substring( nameEQ.length, c.length );
        }
    }

    return null;
  }  


  /**
   * Cookie setzen.
   * 
   * @param name Name des Cookies
   * 
   * @param werte Wert des Cookies
   */
  public setzeCookie( name: string, wert: string ) {

    const MILLISEKUNDEN = 30 * 24 * 60 * 60 * 1000;
    const jetztDate = new Date();
    jetztDate.setTime( jetztDate.getTime() + MILLISEKUNDEN );
    const expires = "; expires=" + jetztDate.toUTCString();
    
    document.cookie = name + "=" + ( wert || "" ) + expires + "; path=/";
  }

}
