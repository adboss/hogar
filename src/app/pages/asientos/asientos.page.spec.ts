import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AsientosPage } from './asientos.page';

describe('AsientosPage', () => {
  let component: AsientosPage;
  let fixture: ComponentFixture<AsientosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsientosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AsientosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
