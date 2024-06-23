import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Seite3PageRoutingModule } from './seite3-routing.module';

import { Seite3Page } from './seite3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Seite3PageRoutingModule
  ],
  declarations: [Seite3Page]
})
export class Seite3PageModule {}
