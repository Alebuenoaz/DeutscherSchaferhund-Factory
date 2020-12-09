import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RejectedPage } from './rejected.page';

describe('RejectedPage', () => {
  let component: RejectedPage;
  let fixture: ComponentFixture<RejectedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RejectedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
