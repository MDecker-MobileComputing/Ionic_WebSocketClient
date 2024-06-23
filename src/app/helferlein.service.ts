import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';


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
  constructor( private alertCtrl: AlertController ) { }


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

}
