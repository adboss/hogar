import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustodiaComponent } from './custodia.component';

describe('CustodiaComponent', () => {
  let component: CustodiaComponent;
  let fixture: ComponentFixture<CustodiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustodiaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustodiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
