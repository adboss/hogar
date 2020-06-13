import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  sections: any[];
  sectionSelected: string;

  constructor() { }

  setSections(data: any[]){
    this.sections = data;
  }

  getSections() {
    return this.sections;
  }

  setSectionSelected(data: string){
    this.sectionSelected = data;
  }

  getSectionSelected() {
    return this.sectionSelected;
  }


}
