import { Component, OnInit, HostListener, 
  ViewChild, ElementRef, Renderer2 } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TransferService } from './services/transfer.service';
import { IonContent} from '@ionic/angular';
import { Scroll } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public empresa = 'Fontaneros';
  public appPages = [
    {
      title: 'Inicio',
      url: '/folder/Inicio',
      icon: 'mail'
    },
    {
      title: 'Beneficios',
      url: '/folder/Beneficios',
      icon: 'paper-plane'
    },
    {
      title: 'Servicios',
      url: '/folder/Servicios',
      icon: 'heart'
    },
    {
      title: 'Contacto',
      url: '/folder/Contacto',
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
  ) {
    this.initializeApp();
    console.log(this.appPages);
    transfer.setSections(this.appPages);
    transfer.setSectionSelected(this.appPages[this.selectedIndex].title)
  }

  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }

   
  }

  

  ngAfterViewInit() {
    
  }
}
