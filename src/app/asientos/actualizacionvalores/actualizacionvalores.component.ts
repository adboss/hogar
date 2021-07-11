import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AsientosService } from 'src/app/services/asientos.service';

@Component({
  selector: 'app-actualizacionvalores',
  templateUrl: './actualizacionvalores.component.html',
  styleUrls: ['./actualizacionvalores.component.scss'],
})
export class ActualizacionvaloresComponent implements OnInit {


  title = "Actualización Valores";

  asientosForm = this.form.group({
    empresa: new FormControl({value: '', disabled: false}, Validators.required),
    sociedad: new FormControl({value: '', disabled: false}, Validators.required),
    descripcion: new FormControl({value: '', disabled: false}, Validators.required),
    inversion: new FormControl({value: '', disabled: false}, Validators.required),
    precio: new FormControl({value: '', disabled: false}, Validators.required),
    acciones: new FormControl({value: '', disabled: false}, Validators.required),
    cambio: new FormControl({value: '', disabled: false}, Validators.required),
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
    
    this.api.actualizacionvalores(
      
    ).subscribe(data => {
      console.info(data);
    });
  }
              

  ngOnInit() {}

}
