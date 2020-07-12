import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RobotsComponent } from './robots/robots.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'fontaneros#Inicio',
    pathMatch: 'full'
  },
  {
    path: 'fontaneros/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'fontaneros',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {
    console.log("AppRoutingModule");
  }
}
