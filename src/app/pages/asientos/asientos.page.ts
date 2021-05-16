import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-asientos',
  templateUrl: './asientos.page.html',
  styleUrls: ['./asientos.page.scss'],
})
export class AsientosPage implements OnInit {

  custodiaForm = this.form.group({
    empresa: new FormControl({value: '', disabled: false}, Validators.required),
    sociedad: new FormControl({value: '', disabled: false}, Validators.required),
    descripcion: new FormControl({value: '', disabled: false}, Validators.required),
    custodia: new FormControl({value: '', disabled: false}, Validators.required),
    contrato: new FormControl({value: '', disabled: true}, Validators.required),
    fecha: new FormControl({value: '', disabled: false}, Validators.required),
    
  });

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
  ]

  sociedadElected:any;
  fechaElected:any;

  sociedadElectedInit = {
    name: '',
    contratos: [
      '', 
    ]
  }

  place = "";
  selectDisabled = false;

  constructor(private form: FormBuilder, private api: ApiService) { 
    this.sociedadElected = this.sociedadElectedInit;
  
  }

  send(){
    let empresa = this.custodiaForm.controls.empresa.value;
    let sociedad = this.sociedadElected.name;
    let contrato = this.custodiaForm.controls.contrato.value;
    let description = this.custodiaForm.controls.descripcion.value;
    let gastoCustodia = this.custodiaForm.controls.custodia.value;
    let fecha = this.fechaElected.substring(0,10);
    this.api.gastoCustodia(
      empresa, sociedad, contrato, description, gastoCustodia, fecha
    ).subscribe(data => {
      console.info(data);
    });
  }


  selectEmpresa($event){
    
    this.sociedadElected = this.sociedades.find(o => o.name === $event.detail.value);
    this.custodiaForm.controls.contrato.reset({ value: '', disabled: false });
    this.place = "";
  }

 

  selectDate($event){
    console.log($event.detail.value);
    this.fechaElected = $event.detail.value;
  }

  heigthSize(){
    return '80px';
  }

  ngOnInit() {
  }

}
