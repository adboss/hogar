import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InversionesfinancierasComponent } from './inversionesfinancieras.component';

describe('InversionesfinancierasComponent', () => {
  let component: InversionesfinancierasComponent;
  let fixture: ComponentFixture<InversionesfinancierasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InversionesfinancierasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InversionesfinancierasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
