import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AsientosService {

 
  fechaElected:any;

  sociedadElectedInit = {
    name: '',
    contratos: [
      '', 
    ]
  }

  adarga3 = {
    name: 'Adarga3',
    contratos: [
      '00', '01', '02', '03', '04'
    ]
  }

  ingDirect = {
    name: 'Ing Direct',
    contratos: [
      '00', 
    ]
  }

  oliverVentures = {
    name: 'Oliver Ventures',
    contratos: [
      '00', '01', '02', 
    ]
  }

  bankinter = {
    name: 'Bankinter',
    contratos: [
      '00', 
    ]
  }

  sociedades = [
    this.adarga3,
    this.ingDirect,
    this.oliverVentures,
    this.bankinter
  ];


  constructor() { }

  heigthSize(){
    return '80px';
  }

  selectDate($event){
    this.fechaElected = $event.detail.value;
  }
}
