import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { DrawerComponent } from '../components/drawer/drawer.component';
import { IonicModule } from '@ionic/angular';
import { DividendosComponent } from '../asientos/dividendos/dividendos.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import { CustodiaComponent } from '../asientos/custodia/custodia.component';
import { MantenimientoComponent } from '../asientos/mantenimiento/mantenimiento.component';
import { AdquisicionComponent } from '../asientos/adquisicion/adquisicion.component';
import { AportacionsociosComponent } from '../asientos/aportacionsocios/aportacionsocios.component';
import { AportacioninversoresComponent } from '../asientos/aportacioninversores/aportacioninversores.component';
import { VentatitulosComponent } from '../asientos/ventatitulos/ventatitulos.component';
import { InversionesfinancierasComponent } from '../asientos/inversionesfinancieras/inversionesfinancieras.component';




@NgModule({
  declarations: [FooterComponent, HeaderComponent, 
    DrawerComponent, DividendosComponent, CustodiaComponent, MantenimientoComponent,
    AdquisicionComponent, AportacionsociosComponent, AportacioninversoresComponent, VentatitulosComponent, InversionesfinancierasComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    MatSelectModule,
    MatFormFieldModule,
    MatExpansionModule,
    ReactiveFormsModule,
  ],
  exports: [FooterComponent, HeaderComponent, 
    DrawerComponent, DividendosComponent, CustodiaComponent, MantenimientoComponent,
    AdquisicionComponent, AportacionsociosComponent, AportacioninversoresComponent, VentatitulosComponent, InversionesfinancierasComponent
  ]
})
export class SharedModule { }
