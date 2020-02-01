import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictsignalsuccessComponent } from './predictsignalsuccess.component';

describe('PredictsignalsuccessComponent', () => {
  let component: PredictsignalsuccessComponent;
  let fixture: ComponentFixture<PredictsignalsuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictsignalsuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictsignalsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
