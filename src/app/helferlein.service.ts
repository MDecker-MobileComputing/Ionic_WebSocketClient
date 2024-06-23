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

}
