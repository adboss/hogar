import { Component, OnInit } from '@angular/core';
import { footerColumns, footerLinks } from '../interfaces';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  

  footer: footerColumns[] = [];
  numCols = 4;
  numLinks = 3;

  constructor() { 
    
    this.startFooterLinks();
  }

  startFooterLinks() {
    let footerLinksColumn: footerColumns = null;
    let footerLinksArray: footerLinks[] = [];
    //let footerLinks: footerLinks;
    
    let footerLinks: footerLinks = {
      web: "Fontaneros Madrid",
      link: "https://fontanerosmadrid.eu/",
    }
    footerLinksArray.push(footerLinks);
  
    footerLinks = {
      web: "Fontanero Urgente",
      link: "https://www.elfontanerourgente.com/",
    }
    footerLinksArray.push(footerLinks);

    footerLinks = {
      web: "Habitisimo",
      link: "https://www.habitissimo.es/",
    }
    footerLinksArray.push(footerLinks);

    footerLinks = {
      web: "Arregla Casa",
      link: "https://arregla-casa.com/fontanero/",
    }
    footerLinksArray.push(footerLinks);

    footerLinksColumn = {
      column: 0,
      rows: footerLinksArray,
    }
    this.footer.push(footerLinksColumn);
    footerLinksArray = [];

    footerLinks = {
      web: "Pluumber",
      link: "https://pluumber.com/",
    }
    footerLinksArray.push(footerLinks);

    footerLinks = {
      web: "Fontanalia",
      link: "https://www.fontanalia.com/",
    }
    footerLinksArray.push(footerLinks);

    footerLinks = {
      web: "Desatascos Madrid Norte",
      link: "https://www.desatascosmadridnorte.com/",
    }
    footerLinksArray.push(footerLinks);
    
    footerLinks = {
      web: "Hermanos García",
      link: "https://www.hermanosgarcia.org/",
    }
    footerLinksArray.push(footerLinks);

    footerLinksColumn = {
      column: 1,
      rows: footerLinksArray,
    }
    this.footer.push(footerLinksColumn);
    footerLinksArray = [];

    footerLinks = {
      web: "Fontanero Wikipedia",
      link: "https://es.wikipedia.org/wiki/Fontanero",
    }
    footerLinksArray.push(footerLinks);
    
    footerLinks = {
      web: "Home Serve",
      link: "https://www.homeserve.es/fontaneros",
    }
    footerLinksArray.push(footerLinks);
  
    footerLinks = {
      web: "Fontanero de Guardia",
      link: "https://fontanerodeguardia.com/",
    }
    footerLinksArray.push(footerLinks);
    
    footerLinks = {
      web: "Madrid Fontaneros",
      link: "https://www.madridfontanero.es/",
    }
    footerLinksArray.push(footerLinks);
    
    footerLinksColumn = {
      column: 2,
      rows: footerLinksArray,
    }
    this.footer.push(footerLinksColumn);
    footerLinksArray = [];

    footerLinks = {
      web: "Fontanero Grinboss",
      link: "http://fontaneros.grinboss.com",
    }
    footerLinksArray.push(footerLinks);

    footerLinks = {
      web: "Adventer",
      link: "http://www.adventer.com",
    }
    footerLinksArray.push(footerLinks);
    
    footerLinks = {
      web: "Adarga",
      link: "http://www.adarga.org",
    }
    footerLinksArray.push(footerLinks);

    footerLinks = {
      web: "Grinboss",
      link: "https://www.grinboss.com/",
    }
    footerLinksArray.push(footerLinks);
    
    footerLinksColumn = {
      column: 3,
      rows: footerLinksArray,
    }
    this.footer.push(footerLinksColumn);
    footerLinksArray = [];

    console.log(this.footer);
    
    
  }

  ngOnInit() {}

}
