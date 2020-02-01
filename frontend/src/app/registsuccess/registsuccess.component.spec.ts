import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistsuccessComponent } from './registsuccess.component';

describe('RegistsuccessComponent', () => {
  let component: RegistsuccessComponent;
  let fixture: ComponentFixture<RegistsuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistsuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
