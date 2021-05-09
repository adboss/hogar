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
      web: "",
      link: "",
    }
    footerLinksArray.push(footerLinks);
  
    footerLinks = {
      web: "",
      link: "",
    }
    footerLinksArray.push(footerLinks);

    

    footerLinksColumn = {
      column: 0,
      rows: footerLinksArray,
    }
    this.footer.push(footerLinksColumn);
    footerLinksArray = [];

    footerLinks = {
      web: "",
      link: "",
    }
    footerLinksArray.push(footerLinks);

    footerLinks = {
      web: "",
      link: "",
    }
    footerLinksArray.push(footerLinks);

    

    footerLinksColumn = {
      column: 1,
      rows: footerLinksArray,
    }
    this.footer.push(footerLinksColumn);
    footerLinksArray = [];

    footerLinks = {
      web: "",
      link: "",
    }
    
    footerLinksArray.push(footerLinks);
    
    footerLinks = {
      web: "",
      link: "",
    }
    footerLinksArray.push(footerLinks);
  
   
    footerLinksColumn = {
      column: 2,
      rows: footerLinksArray,
    }
    this.footer.push(footerLinksColumn);
    footerLinksArray = [];

    footerLinks = {
      web: "",
      link: "",
    }
    footerLinksArray.push(footerLinks);

   
    
    
  }

  ngOnInit() {}

}
