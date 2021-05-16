import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AsientosPageRoutingModule } from './asientos-routing.module';
import { AsientosPage } from './asientos.page';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsientosPageRoutingModule,
    MatSelectModule,
    MatFormFieldModule,
    MatExpansionModule,
    ReactiveFormsModule
  ],
  declarations: [AsientosPage]
})
export class AsientosPageModule {}
