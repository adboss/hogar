import { Component, OnInit, HostListener, 
  ViewChild, ElementRef, Renderer2 } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TransferService } from './services/transfer.service';
import { IonContent} from '@ionic/angular';
import { Router, Scroll } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public empresa = 'Adarga';
  public appPages = [
    {
      title: 'Inicio',
      url: '/Inicio',
      icon: 'mail'
    },
    {
      title: 'Nosotros',
      url: '/Beneficios',
      icon: 'paper-plane'
    },
    {
      title: 'Contacto',
      url: '/Contacto',
      icon: 'heart'
    },
    {
      title: 'Privado',
      url: '/login',
      icon: 'archive'
    },
    
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  @ViewChild(IonContent)
  content:IonContent;
  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private transfer: TransferService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) { 
    
    this.initializeApp();
    transfer.setSections(this.appPages);
    transfer.setSectionSelected(this.appPages[this.selectedIndex].title);
    this.cookiesAlert();
    
  }

  cookiesAlert(){
    if (!this.getCookie("alert")){
      this.openSnackBar("Este sitio no utiliza cookies para analizar sus datos, solo para el funcionamiento básico de la web", "Aceptar");
      
    }     
  }

  openSnackBar(message: string, action: string) {
    let snack = this._snackBar.open(message, action, {
      panelClass: "success-dialog"
    });
    snack.onAction().subscribe(() => {
      this.setCookie("alert", "off", 200);
    })

  }

  setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  redirect(menuItem){
    console.log(menuItem);
    if (menuItem == 'Privado'){
      this.router.navigate(['/login'], { replaceUrl: true });
    }
  }

  ngOnInit() {
    
    const path = window.location.pathname.split('folder/')[1];
    console.log(path);
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    console.log("AppComponent | ngOnInit | End");
   
  }

  

  ngAfterViewInit() {
    
  }
}
