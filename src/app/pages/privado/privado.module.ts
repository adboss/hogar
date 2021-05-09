import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivadoPageRoutingModule } from './privado-routing.module';

import { PrivadoPage } from './privado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrivadoPageRoutingModule
  ],
  declarations: [PrivadoPage]
})
export class PrivadoPageModule {}
