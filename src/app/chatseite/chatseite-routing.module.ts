import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatseitePage } from './chatseite.page';

const routes: Routes = [
  {
    path: '',
    component: ChatseitePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatseitePageRoutingModule {}
