import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteDoctorModalComponent } from './confirm-delete-doctor-modal.component';

describe('ConfirmDeleteDoctorModalComponent', () => {
  let component: ConfirmDeleteDoctorModalComponent;
  let fixture: ComponentFixture<ConfirmDeleteDoctorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDeleteDoctorModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmDeleteDoctorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
