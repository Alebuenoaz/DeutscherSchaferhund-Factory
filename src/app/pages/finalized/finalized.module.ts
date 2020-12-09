import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinalizedPageRoutingModule } from './finalized-routing.module';

import { FinalizedPage } from './finalized.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinalizedPageRoutingModule
  ],
  declarations: [FinalizedPage]
})
export class FinalizedPageModule {}
