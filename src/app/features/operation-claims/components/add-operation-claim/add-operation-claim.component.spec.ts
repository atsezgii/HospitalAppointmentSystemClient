import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOperationClaimComponent } from './add-operation-claim.component';

describe('AddOperationClaimComponent', () => {
  let component: AddOperationClaimComponent;
  let fixture: ComponentFixture<AddOperationClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOperationClaimComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddOperationClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
