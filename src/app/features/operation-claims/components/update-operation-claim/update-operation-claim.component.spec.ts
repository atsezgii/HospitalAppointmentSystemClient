import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOperationClaimComponent } from './update-operation-claim.component';

describe('UpdateOperationClaimComponent', () => {
  let component: UpdateOperationClaimComponent;
  let fixture: ComponentFixture<UpdateOperationClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateOperationClaimComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateOperationClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
