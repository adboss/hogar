import { Component, OnInit, Input, ViewChild, ChangeDetectorRef, HostListener, Inject } from '@angular/core';
import { ActivatedRoute, Scroll, Router } from '@angular/router';
import { TransferService } from '../services/transfer.service';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { FormControl } from '@angular/forms';
import { ConnectionService } from '../services/connection.service';
import { email } from '../interfaces';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {

  // Variables ****************************************************************
  
  public folder: string;
  public array: any[];
  fragment: any;

  name = new FormControl('');
  email = new FormControl('');
  subject = new FormControl('');
  phone = new FormControl('');
  message = new FormControl('');

  myemail: email = {
    email: "",
    message: "",
    name: "",
    phone: "",
    subject: "",

  };

  // Data **********************************************************************

  imgAlt1 = "Inversión Adarga Alta rentabilidad mínimo riesgo";
  imgAlt2 = "Inversión Adarga Alta rentabilidad mínimo riesgo";
  imgAlt3 = "Inversión Adarga Alta rentabilidad mínimo riesgo";

  title = "Adarga: la confianza es lo primero";
  author = "Adarga Capital";
  description = "Adarga: El objeto social es la inversión a largo plazo del patrimonio confiado por los socios. La inversión se realiza con los criterios de prudencia y con el objetivo de maximizar el ratio de rentabilidad/riesgo";
  keywords = "Inversión, rentabilidad, riesgo, patrimonio, dividendos";
  
  // Text **********************************************************************

  pageTitle = "Adarga";
  cardTitle = "Adarga";
  slogan = "Confianza, Sentido y Tecnología";
  paragraph1_benefits = "Adarga Capital, S.L. es una sociedad patrimonial al servicio de sus socios. Esta inscrita en el Registro Mercantil de Madrid con el número XXXXXXX";
  paragraph2_benefits = "La razón de ser de Adarga es la inversión a largo plazo del patrimonio confiado por los socios. La inversión se realiza con los criterios de prudencia y con el objetivo de maximizar el ratio de rentabilidad/riesgo";
  paragraph3_benefits = "La sociedad no está supervisada por la CNMV porque su objeto social no está incluido dentro de los supuestos de dicho regulador. Por eso es importante destacar que no ofrece servicios de inversión al público general";
  paragraph4_benefits = "La estrategia de inversión llevada a cabo se basa en los siguientes pilares: ";
  paragraph5_benefits = "";


  line1 = "Nuestro horizonte de inversión es a largo plazo (5-20 años)";
  line2 = "Invertimos en las empresas que van a transformar el mundo en dicho plazo";
  line3 = "Nuestro posicionamiento inversor está orientado el 'Value Investment'";
  line4 = "Basamos nuestras decisiones en modelos cuantitativos y cualitativos";
  line5 = "Nuestros modelos cuantitativos están totalmente automatizados con software de última generación lo que nos dispone de una visión de las oportunidades de mercado en tiempo real";
  line6 = "Nuestros modelos cualitativos están basados en los de las Universidades más prestigiosas, especialmente la Harvard Business School";
  line7 = "Nos acogemos a los estándares éticos más exigentes del mercado (CFA Institute)";
  line8 = "Nos apoyamos en la información proporcionada por las publicaciones más prestigiosas del mercado: The Wall Street Journal, Barron's, Fortune...";
  public strategicLines: any[] = [this.line1, this.line2, this.line3, this.line4, this.line5, this.line6, this.line7, this.line8];


  emailContact = "rafael@adarga.org";
  phoneContact = "636 292 605";
  websiteContact = "https://www.adarga.org";
  




  constructor(private activatedRoute: ActivatedRoute,
              private transfer: TransferService,
              private titleService: Title,
              private metaTagService: Meta,  
              @Inject(DOCUMENT) private document,   
              //private fb: FormBuilder,
              private conn: ConnectionService,
              public toastController: ToastController,
              private route: ActivatedRoute,
              private router: Router,
              
              
    ) { 
      
      this.array = transfer.getSections();
      //this.array.pop();
      this.folder = transfer.getSectionSelected();
      this.myemail.email = this.email.value;
      this.myemail.name = this.name.value;
      this.myemail.subject = this.subject.value;
      this.myemail.phone = this.phone.value;
      this.myemail.message = this.message.value;

    }
  
    sendEmail() {
      this.presentToast();
      this.conn.sendEmail(this.myemail).subscribe(data => {
        console.log(data);
        this.name.reset();
        this.email.reset();
        this.subject.reset();
        this.phone.reset();
        this.message.reset();
    });
    }

    async presentToast() {
      const toast = await this.toastController.create({
        message: 'Tu correo ha sido enviado con éxito. Contactaremos contigo próximamente',
        duration: 2000,
        position: 'top',
        cssClass: 'toast'
      });
      toast.present();
    }

    async presentToastWithOptions() {
      const toast = await this.toastController.create({
        header: 'Toast header',
        message: 'Click to Close',
        position: 'top',
        buttons: [
          {
            side: 'start',
            icon: 'star',
            text: 'Favorite',
            handler: () => {
              console.log('Favorite clicked');
            }
          }, {
            text: 'Done',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      toast.present();
    }
  
  
  
  ngOnInit() {
    
    this.titleService.setTitle(this.title);
    this.metaTagService.addTags([
      {name: 'description', content: this.description},
      {name: 'author', content: this.author},
      {name: 'keywords', content: this.keywords},
    ]);
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.activatedRoute.fragment.subscribe(fragment => { this.fragment = fragment;})
    
  }

  

  ngAfterViewChecked(): void {
    
    try { 
      
      if(this.fragment) {
        //console.info(this.fragment);

        if (this.fragment == "Privado"){
          
          this.fragment = "Inicio";
          this.router.navigate(['/login'], { replaceUrl: true });
        } else {
          document.querySelector('#' + this.fragment).scrollIntoView({ behavior: 'smooth', block: 'start' }); 
        }
            
        
      }
    } catch (e) { 
      console.log("Error");
      
      
      
    }

    this.myemail.email = this.email.value;
      this.myemail.name = this.name.value;
      this.myemail.subject = this.subject.value;
      this.myemail.phone = this.phone.value;
      this.myemail.message = this.message.value;

  }

    

  

}
