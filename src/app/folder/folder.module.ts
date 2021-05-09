import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';
import { FolderPage } from './folder.page';
import { ConnectionService } from '../services/connection.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    
    HttpClientModule,
    SharedModule
  ],
  declarations: [FolderPage, ],
  providers: [
    ConnectionService
  ]
})
export class FolderPageModule {
  constructor() {
    
  }
}
