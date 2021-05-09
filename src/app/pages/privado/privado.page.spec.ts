import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrivadoPage } from './privado.page';

describe('PrivadoPage', () => {
  let component: PrivadoPage;
  let fixture: ComponentFixture<PrivadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivadoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrivadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
