import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsientosPageRoutingModule } from './asientos-routing.module';

import { AsientosPage } from './asientos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsientosPageRoutingModule
  ],
  declarations: [AsientosPage]
})
export class AsientosPageModule {}
