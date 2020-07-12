import { Component, OnInit, Input, ViewChild, ChangeDetectorRef, HostListener, Inject } from '@angular/core';
import { ActivatedRoute, Scroll } from '@angular/router';
import { TransferService } from '../services/transfer.service';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { FormControl } from '@angular/forms';
import { ConnectionService } from '../services/connection.service';
import { email } from '../interfaces';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public array: any[];

  imgAlt1 = "Fontanería Gratis Avería Rápido";
  imgAlt2 = "Fontanería Gratis Avería Urgencia";
  imgAlt3 = "Fontanería Gratis Avería Urgencia Teléfono";

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
  

  constructor(private activatedRoute: ActivatedRoute,
              private transfer: TransferService,
              private titleService: Title,
              private metaTagService: Meta,  
              @Inject(DOCUMENT) private document,   
              //private fb: FormBuilder,
              private conn: ConnectionService,
              
    ) { 
      
      this.array = transfer.getSections();
      this.folder = transfer.getSectionSelected();
      this.myemail.email = this.email.value;
      this.myemail.name = this.name.value;
      this.myemail.subject = this.subject.value;
      this.myemail.phone = this.phone.value;
      this.myemail.message = this.message.value;
    }
  
    sendEmail() {
      this.conn.sendEmail(this.myemail).subscribe(data => {
        console.log(data);
    });
    }
  
  ngOnInit() {
    
    this.titleService.setTitle("Fontaneros: la primera visita siempre es gratis");
    this.metaTagService.addTags([
      {name: 'description', content: "Consigue los mejores servicios de fontanería, deje su preocupación en nuestras manos"},
      {name: 'author', content: "Grinboss"},
      {name: 'keywords', content: "Fontanería, Averías, Urgencias, Visitas, Gratis"},
    ]);
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.activatedRoute.fragment.subscribe(fragment => { this.fragment = fragment;})
    
  }

  

  ngAfterViewChecked(): void {
    
    try { 
      
      if(this.fragment) {
        document.querySelector('#' + this.fragment).scrollIntoView({ behavior: 'smooth', block: 'start' });     
        
      }
    } catch (e) { console.log("Error"); }

    this.myemail.email = this.email.value;
      this.myemail.name = this.name.value;
      this.myemail.subject = this.subject.value;
      this.myemail.phone = this.phone.value;
      this.myemail.message = this.message.value;

  }

    

  

}
