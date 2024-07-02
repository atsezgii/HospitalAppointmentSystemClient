import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserClaimComponent } from './add-user-claim.component';

describe('AddUserClaimComponent', () => {
  let component: AddUserClaimComponent;
  let fixture: ComponentFixture<AddUserClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserClaimComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUserClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
