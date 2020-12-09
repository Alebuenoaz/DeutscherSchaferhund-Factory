import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FinalizedPage } from './finalized.page';

describe('FinalizedPage', () => {
  let component: FinalizedPage;
  let fixture: ComponentFixture<FinalizedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalizedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FinalizedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
