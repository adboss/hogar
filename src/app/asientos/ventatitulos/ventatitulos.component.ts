import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { AsientosService } from '../../services/asientos.service';

@Component({
  selector: 'app-ventatitulos',
  templateUrl: './ventatitulos.component.html',
  styleUrls: ['./ventatitulos.component.scss'],
})
export class VentatitulosComponent implements OnInit {

  title = "Venta Títulos";

  asientosForm = this.form.group({
    empresa: new FormControl({value: '', disabled: false}, Validators.required),
    sociedad: new FormControl({value: '', disabled: false}, Validators.required),
    descripcion: new FormControl({value: '', disabled: false}, Validators.required),
    inversion: new FormControl({value: '', disabled: false}, Validators.required),
    precio: new FormControl({value: '', disabled: false}, Validators.required),
    acciones: new FormControl({value: '', disabled: false}, Validators.required),
    contrato: new FormControl({value: '', disabled: true}, Validators.required),
    cambio: new FormControl({value: '', disabled: false}, Validators.required),
    fecha: new FormControl({value: '', disabled: false}, Validators.required),
    
  });

  sociedadElected:any;

  constructor(private form: FormBuilder, private api: ApiService,
                private asi:AsientosService,
                private datepipe: DatePipe,
                private alertController: AlertController,
                private router: Router,
                private loadingController: LoadingController
                ) { 
    this.sociedadElected = this.asi.sociedadElectedInit;
  }

  selectEmpresa($event){
    
    this.sociedadElected = this.asi.sociedades.find(o => o.name === $event.detail.value);
    this.asientosForm.controls.contrato.reset({ value: '', disabled: false });
    
  }

  async send(){

    const loading = await this.loadingController.create();
    await loading.present();


    let empresa = this.asientosForm.controls.empresa.value;
    let sociedad = this.sociedadElected.name;
    let contrato = this.asientosForm.controls.contrato.value;
    let description = this.asientosForm.controls.descripcion.value;
    let inversion = this.asientosForm.controls.inversion.value;
    let precio = this.asientosForm.controls.precio.value;
    let acciones = this.asientosForm.controls.acciones.value;
    let cambio = this.asientosForm.controls.cambio.value;
    let fecha = this.asi.fechaElected.substring(0,10);
    
    fecha = this.datepipe.transform(fecha, 'dd-MM-yyyy');
      
      this.api.ventatitulos(
        empresa, sociedad, contrato, description, inversion, precio, 
        acciones, cambio,
        fecha
      ).subscribe( async data => {
        console.info(data);
        if (data == null){
          await loading.dismiss();
          } else {   
          await loading.dismiss();
          const alert = await this.alertController.create({
            header: 'Mensaje',
            message: data['error'],
            buttons: ['OK'],
          });
          await alert.present();
        }
      });
  }

  ngOnInit() {}

}
