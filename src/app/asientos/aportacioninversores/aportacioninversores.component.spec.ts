import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AportacioninversoresComponent } from './aportacioninversores.component';

describe('AportacioninversoresComponent', () => {
  let component: AportacioninversoresComponent;
  let fixture: ComponentFixture<AportacioninversoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AportacioninversoresComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AportacioninversoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
