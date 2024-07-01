import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeeedbackComponent } from './add-feeedback.component';

describe('AddFeeedbackComponent', () => {
  let component: AddFeeedbackComponent;
  let fixture: ComponentFixture<AddFeeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFeeedbackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddFeeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
