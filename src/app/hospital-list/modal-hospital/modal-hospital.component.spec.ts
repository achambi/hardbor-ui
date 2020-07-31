import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHospitalComponent } from './modal-hospital.component';

describe('ModalHospitalComponent', () => {
  let component: ModalHospitalComponent;
  let fixture: ComponentFixture<ModalHospitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalHospitalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
