import { Component, OnInit } from '@angular/core';
import { RxStompService } from '../rx-stomp.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor( private stompService: RxStompService ) {}

  ngOnInit(): void {

    /*
    console.log( "Versuche STOMP-Topic zu abonnieren..." );

    this.stompService.rxStomp
        .watch({ destination: "/topic/schlagzeilen" })
        .subscribe( (message) => console.log( message.body ) );

    console.log( "STOMP-Topic abonniert!" );
    */
  }

}
