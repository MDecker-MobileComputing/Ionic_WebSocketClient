import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


/**
 * Seite für den Chat-Verlauf.
 */
@Component({
  selector: 'app-chatseite',
  templateUrl: './chatseite.page.html',
  styleUrls: ['./chatseite.page.scss'],
})
export class ChatseitePage  {

  /** Name Chat-Kanal, wird mit Interpolation auf UI angezeigt */
  public kanalname: string | null = "";

  /** Nickname Chat-Teilnehmer, wird mit Interpolation auf UI angezeigt */
  public nickname: string | null = "";


  /**
   * Konstruktor für Auslesen der URL-Parameter.
   */
  constructor( private activatedRoute: ActivatedRoute ) {

    this.kanalname = activatedRoute.snapshot.queryParamMap.get( "kanalname" );
    this.nickname  = activatedRoute.snapshot.queryParamMap.get( "nickname"  );
  }

}
