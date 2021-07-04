import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AsientosService } from '../../services/asientos.service';

@Component({
  selector: 'app-aportacioninversores',
  templateUrl: './aportacioninversores.component.html',
  styleUrls: ['./aportacioninversores.component.scss'],
})
export class AportacioninversoresComponent implements OnInit {

  title = "Aportación Inversores";

  asientosForm = this.form.group({
    
    sociedad: new FormControl({value: '', disabled: false}, Validators.required),
    descripcion: new FormControl({value: '', disabled: false}, Validators.required),
    aportacion: new FormControl({value: '', disabled: false}, Validators.required),
    inversor: new FormControl({value: '', disabled: false}, Validators.required),
    contrato: new FormControl({value: '', disabled: true}, Validators.required),
    fecha: new FormControl({value: '', disabled: false}, Validators.required),
    
  });

  sociedadElected:any;

  constructor(private form: FormBuilder, private api: ApiService,
                private asi:AsientosService,
                private datepipe: DatePipe
                ) { 
    this.sociedadElected = this.asi.sociedadElectedInit;
  }

  selectEmpresa($event){
    
    this.sociedadElected = this.asi.sociedades.find(o => o.name === $event.detail.value);
    this.asientosForm.controls.contrato.reset({ value: '', disabled: false });
    
  }

  send(){
    
    let sociedad = this.sociedadElected.name;
    let contrato = this.asientosForm.controls.contrato.value;
    let description = this.asientosForm.controls.descripcion.value;
    let aportacion = this.asientosForm.controls.aportacion.value;
    let inversor = this.asientosForm.controls.inversor.value;
    let fecha = this.asi.fechaElected.substring(0,10);
    fecha = this.datepipe.transform(fecha, 'dd-MM-yyyy');
    this.api.aportacioninversores(
      sociedad, contrato, description, aportacion, inversor, 
      fecha
    ).subscribe(data => {
      console.info(data);
    });
  }
              
  

  ngOnInit() {}

}
