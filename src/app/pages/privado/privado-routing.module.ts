import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivadoPage } from './privado.page';
import { InformesPageModule } from '../informes/informes.module';

const routes: Routes = [
  {
    path: '',
    component: PrivadoPage,
    children: [
      {
        path: 'informes',
        children: [
          {
            path: '',
            //loadChildren: '../informes/informes.module#InformesPageModule'
            loadChildren: ()=> import('../informes/informes.module').then(m => m.InformesPageModule)
          }
        ]
      },
      {
        path: 'asientos',
        children: [
          {
            path: '',
            loadChildren: '../asientos/asientos.module#AsientosPageModule'
          }
        ]
      },
      {
        path: 'analisis',
        children: [
          {
            path: '',
            loadChildren: '../analisis/analisis.module#AnalisisPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: 'informes',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), InformesPageModule],
  exports: [RouterModule],
})
export class PrivadoPageRoutingModule {}
