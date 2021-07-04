import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AsientosService } from 'src/app/services/asientos.service';

@Component({
  selector: 'app-dividendos',
  templateUrl: './dividendos.component.html',
  styleUrls: ['./dividendos.component.scss'],
})
export class DividendosComponent implements OnInit {

  title = "Dividendos";

  asientosForm = this.form.group({
    empresa: new FormControl({value: '', disabled: false}, Validators.required),
    sociedad: new FormControl({value: '', disabled: false}, Validators.required),
    descripcion: new FormControl({value: '', disabled: false}, Validators.required),
    dividendo: new FormControl({value: '', disabled: false}, Validators.required),
    retencionEnOrigen: new FormControl({value: '', disabled: false}, Validators.required),
    retencionEnDestino: new FormControl({value: '', disabled: false}, Validators.required),
    gastoComisionDividendo: new FormControl({value: '', disabled: false}, Validators.required),
    ivaComisionDividendo: new FormControl({value: '', disabled: false}, Validators.required),
    cambio: new FormControl({value: '', disabled: false}, Validators.required),
    contrato: new FormControl({value: '', disabled: true}, Validators.required),
    fecha: new FormControl({value: '', disabled: false}, Validators.required),
    
  });

  sociedadElected:any;

  constructor(private form: FormBuilder, private api: ApiService,
                private asi:AsientosService,
                private datepipe: DatePipe) { 
    this.sociedadElected = this.asi.sociedadElectedInit;
  }

  selectEmpresa($event){
    
    this.sociedadElected = this.asi.sociedades.find(o => o.name === $event.detail.value);
    this.asientosForm.controls.contrato.reset({ value: '', disabled: false });
    
  }

  send(){
    let empresa = this.asientosForm.controls.empresa.value;
    let sociedad = this.sociedadElected.name;
    let contrato = this.asientosForm.controls.contrato.value;
    let description = this.asientosForm.controls.descripcion.value;
    let dividendo = this.asientosForm.controls.dividendo.value;
    let retencionEnOrigen = this.asientosForm.controls.retencionEnOrigen.value;
    let retencionEnDestino = this.asientosForm.controls.retencionEnDestino.value;
    let gastoComisionDividendo = this.asientosForm.controls.gastoComisionDividendo.value;
    let ivaComisionDividendo = this.asientosForm.controls.ivaComisionDividendo.value;
    let cambio = this.asientosForm.controls.cambio.value;
    let fecha = this.asi.fechaElected.substring(0,10);
    fecha = this.datepipe.transform(fecha, 'dd-MM-yyyy');
    this.api.gastoDividendo(
      empresa, sociedad, contrato, description, dividendo, retencionEnOrigen, retencionEnDestino, gastoComisionDividendo, ivaComisionDividendo, cambio,
      fecha
    ).subscribe(data => {
      console.info(data);
    });
  }
              
  

  ngOnInit() {}

}
