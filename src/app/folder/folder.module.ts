import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { FooterComponent } from '../footer/footer.component';
import { ConnectionService } from '../services/connection.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    
    HttpClientModule,
  ],
  declarations: [FolderPage, FooterComponent],
  providers: [
    ConnectionService
  ]
})
export class FolderPageModule {
  constructor() {
    console.log("FolderPageModule");
  }
}
