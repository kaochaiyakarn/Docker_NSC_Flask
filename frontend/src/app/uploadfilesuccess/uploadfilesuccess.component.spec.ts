import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadfilesuccessComponent } from './uploadfilesuccess.component';

describe('UploadfilesuccessComponent', () => {
  let component: UploadfilesuccessComponent;
  let fixture: ComponentFixture<UploadfilesuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadfilesuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadfilesuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
