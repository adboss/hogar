import { Component, OnInit, Input, ViewChild, ChangeDetectorRef, HostListener, Inject } from '@angular/core';
import { ActivatedRoute, Scroll } from '@angular/router';
import { TransferService } from '../services/transfer.service';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public array: any[];
  

  constructor(private activatedRoute: ActivatedRoute,
              private transfer: TransferService,
              
    ) { 
      this.array = transfer.getSections();
      this.folder = transfer.getSectionSelected();
    }
  
    @HostListener('window:scroll', ['$event']) // for window scroll events
    onScroll(event) {
      console.log("hhh");
    }
    
  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  

}
