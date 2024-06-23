import { Component } from '@angular/core';
import { HelferleinService } from '../helferlein.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-seite3',
  templateUrl: './seite3.page.html',
  styleUrls: ['./seite3.page.scss'],
})
export class Seite3Page  {

  /** Name des Chat-Kanals, mit Two-Way-Binding an <ion-input> gebunden. */
  public kanalname: string = "";

  /** Nickname, mit Two-Way-Binding an <ion-input> gebunden. */
  public nickname: string = "";


  /**
   * Konstruktor für *Dependency Injection*.
   */
  constructor( private helferlein: HelferleinService,
               private navCtrl  : NavController ) { }   


  /**
   * Event-Handler für Klick auf "Beitreten"-Button.
   */
  public onBeitretenButton() {

    const kanalnameNorm = this.kanalname.trim();
    const nicknameNorm  = this.nickname.trim();

    if( kanalnameNorm.length < 3 ) {

      this.helferlein.zeigeDialog( "Ungültige Eingabe", 
                                   "Kanalname muss mindestens 3 Zeichen lang sein!" );
      return;
    }
    if ( nicknameNorm.length < 3 ) {

      this.helferlein.zeigeDialog( "Ungültige Eingabe", 
                                   "Nickname muss mindestens 3 Zeichen lang sein!" );
      return;
    } 

    const naviZiel = `/chatseite?kanalname=${kanalnameNorm}&nickname=${nicknameNorm}`;
    this.navCtrl.navigateForward( naviZiel );
  }

}
