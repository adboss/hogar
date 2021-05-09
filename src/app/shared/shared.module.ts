import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { DrawerComponent } from '../components/drawer/drawer.component';
import { IonicModule } from '@ionic/angular';




@NgModule({
  declarations: [FooterComponent, HeaderComponent, 
    DrawerComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [FooterComponent, HeaderComponent, 
    DrawerComponent
  ]
})
export class SharedModule { }
