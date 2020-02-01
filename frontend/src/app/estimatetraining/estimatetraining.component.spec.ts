import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatetrainingComponent } from './estimatetraining.component';

describe('EstimatetrainingComponent', () => {
  let component: EstimatetrainingComponent;
  let fixture: ComponentFixture<EstimatetrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstimatetrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimatetrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
