import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DividendosComponent } from './dividendos.component';

describe('DividendosComponent', () => {
  let component: DividendosComponent;
  let fixture: ComponentFixture<DividendosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DividendosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DividendosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
