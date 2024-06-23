import { Component } from '@angular/core';
import { HelferleinService } from '../helferlein.service';
import { NavController } from '@ionic/angular';


/**
 * Seite für Eingabe von Chat-Kanal und Nickname.
 */
@Component({
  selector: 'app-seite3',
  templateUrl: './seite3.page.html',
  styleUrls: ['./seite3.page.scss'],
})
export class Seite3Page  {

  /** Name des Cookies mit Kanalname. */
  readonly COOKIE_KEY_KANALNAME = "chat_kanalname";

  /** Name des Cookies mit Nickname. */
  readonly COOKIE_KEY_NICKNAME = "chat_nickname";


  /** Name des Chat-Kanals, mit Two-Way-Binding an <ion-input> gebunden. */
  public kanalname: string = "";

  /** Nickname, mit Two-Way-Binding an <ion-input> gebunden. */
  public nickname: string = "";


  /**
   * Konstruktor für *Dependency Injection*.
   */
  constructor( private helferlein: HelferleinService,
               private navCtrl   : NavController ) { }                


  /**
   * Event-Handler wird aufgerufen, wenn die Seite initialisiert wurde.
   */  
  ngOnInit() {

    const kanalnameVonCookie = this.helferlein.leseCookie( this.COOKIE_KEY_KANALNAME );
    if ( kanalnameVonCookie !== null ) {

      this.kanalname = kanalnameVonCookie;
    }
    
    const nicknameVonCookie = this.helferlein.leseCookie( this.COOKIE_KEY_NICKNAME );
    if ( nicknameVonCookie !== null ) {

      this.nickname = nicknameVonCookie;
    }
  }


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

    this.helferlein.setzeCookie( this.COOKIE_KEY_KANALNAME, kanalnameNorm );
    this.helferlein.setzeCookie( this.COOKIE_KEY_NICKNAME , nicknameNorm  );

    const naviZiel = `/chatseite?kanalname=${kanalnameNorm}&nickname=${nicknameNorm}`;
    this.navCtrl.navigateForward( naviZiel );
  }

}
