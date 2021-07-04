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

  mantenimientoForm = this.form.group({
    empresa2: new FormControl({value: '', disabled: false}, Validators.required),
    sociedad2: new FormControl({value: '', disabled: false}, Validators.required),
    descripcion2: new FormControl({value: '', disabled: false}, Validators.required),
    mantenimiento2: new FormControl({value: '', disabled: false}, Validators.required),
    contrato2: new FormControl({value: '', disabled: true}, Validators.required),
    fecha2: new FormControl({value: '', disabled: false}, Validators.required),
    
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

  sociedadElectedCustodia:any;
  fechaElectedCustodia:any;

  sociedadElectedMantenimiento:any;
  fechaElectedMantenimiento:any;




  sociedadElectedInit = {
    name: '',
    contratos: [
      '', 
    ]
  }

  place = "";
  selectDisabled = false;

  constructor(private form: FormBuilder, private api: ApiService) { 
    this.sociedadElectedCustodia = this.sociedadElectedInit;
    this.sociedadElectedMantenimiento = this.sociedadElectedInit;
  
  }

  sendCustodia(){
    let empresa = this.custodiaForm.controls.empresa.value;
    let sociedad = this.sociedadElectedCustodia.name;
    let contrato = this.custodiaForm.controls.contrato.value;
    let description = this.custodiaForm.controls.descripcion.value;
    let gastoCustodia = this.custodiaForm.controls.custodia.value;
    let fecha = this.fechaElectedCustodia.substring(0,10);
    this.api.gastoCustodia(
      sociedad, contrato, description, gastoCustodia, fecha
    ).subscribe(data => {
      console.info(data);
    });
  }

  sendMantenimiento(){
    let empresa = this.mantenimientoForm.controls.empresa.value;
    let sociedad = this.sociedadElectedMantenimiento.name;
    let contrato = this.mantenimientoForm.controls.contrato.value;
    let description = this.mantenimientoForm.controls.descripcion.value;
    let gastoCustodia = this.mantenimientoForm.controls.custodia.value;
    let fecha = this.fechaElectedMantenimiento.substring(0,10);
    this.api.gastoMantenimiento(
      sociedad, contrato, description, gastoCustodia, fecha
    ).subscribe(data => {
      console.info(data);
    });
  }


  selectEmpresaCustodia($event){
    
    this.sociedadElectedCustodia = this.sociedades.find(o => o.name === $event.detail.value);
    this.custodiaForm.controls.contrato.reset({ value: '', disabled: false });
    this.place = "";
  }

  selectDateCustodia($event){
    this.fechaElectedCustodia = $event.detail.value;
  }

  selectEmpresaMantenimiento($event){
    
    this.sociedadElectedMantenimiento = this.sociedades.find(o => o.name === $event.detail.value);
    this.custodiaForm.controls.contrato.reset({ value: '', disabled: false });
    this.place = "";
  }

  selectDateMantenimiento($event){
    this.fechaElectedMantenimiento = $event.detail.value;
  }

  heigthSize(){
    return '80px';
  }

  ngOnInit() {
  }

}
