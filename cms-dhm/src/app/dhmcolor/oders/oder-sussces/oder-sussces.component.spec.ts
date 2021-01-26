import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OderSusscesComponent } from './oder-sussces.component';

describe('OderSusscesComponent', () => {
  let component: OderSusscesComponent;
  let fixture: ComponentFixture<OderSusscesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OderSusscesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OderSusscesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
