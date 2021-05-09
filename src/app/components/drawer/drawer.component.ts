import { AfterViewInit, Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { GestureController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent implements AfterViewInit {

  @ViewChild("drawer", { read: ElementRef}) drawer: ElementRef;
  @Output('openStateChanged') openState: EventEmitter<boolean> = new EventEmitter();
  isOpen = false;
  openHeight = 0;
  @Output() company = new EventEmitter<any>();
  companiesList = ["Adarga3", "Oliver Ventures", "Ing Direct", "Bankinter"];

  constructor(private plt: Platform,
        private gestureCtrl: GestureController
      ) { }

      public companySelected(com): void {
        console.log(com);
        this.company.emit(com);
    }

  async toggleDrawer(){
    const drawer = this.drawer.nativeElement;
    this.openState.emit(!this.isOpen)

    if (this.isOpen) {
      drawer.style.transition = '.4s easy-out';
      drawer.style.transform = '';
      this.isOpen = false;
    } else {
      drawer.style.transition = '.4s easy-out';
      drawer.style.transform = `translateY(${-this.openHeight}px)`;
      this.isOpen = true;
    }
      
   
  }

  async ngAfterViewInit() {
    const drawer = this.drawer.nativeElement;
    this.openHeight = (this.plt.height() / 100) * 40;

    const gesture = await this.gestureCtrl.create({
      el: drawer,
      gestureName: 'swipe',
      direction: 'y',
      onMove: ev => {
        if (ev.deltaY < -this.openHeight) return;
        drawer.style.transform = `translateY(${ev.deltaY}px)`;
      },
      onEnd: ev => {
        if (ev.deltaY < -50 && !this.isOpen) {
          drawer.style.transition = '.4s easy-out';
          drawer.style.transform = `translateY(${-this.openHeight}px)`;
          this.openState.emit(true);
          this.isOpen = true;
        } else if (ev.deltaY > 50 && this.isOpen) {
          drawer.style.transition = '.4s easy-out';
          drawer.style.transform = '';
          this.openState.emit(false);
          this.isOpen = false;
        }
      }
    });
    gesture.enable(true);
  }

}
