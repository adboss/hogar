import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformesPageRoutingModule } from './informes-routing.module';

import { InformesPage } from './informes.page';
import { SharedModule } from '../../shared/shared.module';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformesPageRoutingModule,
    SharedModule,
    
  ],
  declarations: [InformesPage]
})
export class InformesPageModule {}
