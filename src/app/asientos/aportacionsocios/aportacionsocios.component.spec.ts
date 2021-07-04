import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AportacionsociosComponent } from './aportacionsocios.component';

describe('AportacionsociosComponent', () => {
  let component: AportacionsociosComponent;
  let fixture: ComponentFixture<AportacionsociosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AportacionsociosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AportacionsociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
