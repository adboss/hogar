import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RobotsComponent } from './robots/robots.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '#Inicio',
    pathMatch: 'full'
  },
  
  {
    path: '',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '#Privado',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'privado',
    loadChildren: () => import('./pages/privado/privado.module').then( m => m.PrivadoPageModule),
    canLoad: [AuthGuard]
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
