import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AppModule } from 'src/app/app.module';
import { report } from 'src/app/interfaces/report';
import { ConnectionService } from 'src/app/services/connection.service';
import { DrawerService } from 'src/app/services/drawer.service';


@Component({
  selector: 'app-informes',
  templateUrl: './informes.page.html',
  styleUrls: ['./informes.page.scss'],
})
export class InformesPage implements OnInit {

  rep: report = null;
  repArray = new Array();
  company: any = "Bankinter";
  index:number = 0;

  backdropVisible = false;
  

  constructor(private conn: ConnectionService,
        public loadingController: LoadingController,
        private alertController: AlertController,
        private modalCtrl: ModalController,
        private drawerService: DrawerService,
        private changeDetectorRef: ChangeDetectorRef
        ) { 
    this.setRepZero();
    
    this.get();
  }

  async get(){
    let service = "/financialreporting";
    const loading = await this.loadingController.create();
    await loading.present();
    this.conn.getAccounting(service).subscribe( async res => {
      console.log(res);
      this.repArray = res;
      await loading.dismiss();
      
    });
  }

  toggleBackdrop(isVisible){
    this.backdropVisible = isVisible;
    console.log("Change: ", isVisible);
    this.changeDetectorRef.detectChanges();
  }

  getCompany(com){
    this.company = com;
    let len = this.repArray.length;
    for (var i=0; i<len; i++){
      let comp = this.repArray[i].company;
      if (comp == com){
        this.index = i;
      }
    }

  }
 

  setRepZero(){

    let activosInit = {
      ActivoCirculante: 0,
      ActivoFijo: 0,
      ActivoFinanciero: 0
    }

    let cuentaResultadosInit = {
      gastosComisiones: 0,
      gastosCustodia: 0,
      gastosMantenimiento: 0,
      ingresosDividendos: 0,
      resultadoDelEjercicio: 0,

    }

    let pasivosInit = {
      AcreedoresLargoPlazo: 0,
      AcreedoresOperacionesComun: 0,
      PasivoCirculante: 0,
    }

    let patrimonioNetoInit = {
      AjustesPorCambioValor: 0,
      CapitalSocial: 0,
      Reservas: 0,
      ResultadosPendientesAplicacion: 0,
    }

    this.rep = {
      company: "A",
      activos: activosInit,
      cuentaResultados: cuentaResultadosInit,
      pasivos: pasivosInit,
      patrimonioNeto: patrimonioNetoInit,
    }
    
    this.repArray[0] = this.rep;
    this.repArray[1] = this.rep;
    this.repArray[2] = this.rep;
    this.repArray[3] = this.rep;

  }

  
  
  

  ngOnInit() {
    
    
  }

  

}
