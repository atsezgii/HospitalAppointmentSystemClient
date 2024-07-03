import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPatientDeleteModalComponent } from './confirm-patient-delete-modal.component';

describe('ConfirmPatientDeleteModalComponent', () => {
  let component: ConfirmPatientDeleteModalComponent;
  let fixture: ComponentFixture<ConfirmPatientDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmPatientDeleteModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmPatientDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
