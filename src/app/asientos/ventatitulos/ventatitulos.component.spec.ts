import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VentatitulosComponent } from './ventatitulos.component';

describe('VentatitulosComponent', () => {
  let component: VentatitulosComponent;
  let fixture: ComponentFixture<VentatitulosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentatitulosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VentatitulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
