import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OderWaitingComponent } from './oder-waiting.component';

describe('OderWaitingComponent', () => {
  let component: OderWaitingComponent;
  let fixture: ComponentFixture<OderWaitingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OderWaitingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OderWaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
