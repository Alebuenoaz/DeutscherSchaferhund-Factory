import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinalizedPage } from './finalized.page';

const routes: Routes = [
  {
    path: '',
    component: FinalizedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinalizedPageRoutingModule {}
