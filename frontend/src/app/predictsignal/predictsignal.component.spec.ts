import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictsignalComponent } from './predictsignal.component';

describe('PredictsignalComponent', () => {
  let component: PredictsignalComponent;
  let fixture: ComponentFixture<PredictsignalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictsignalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictsignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
