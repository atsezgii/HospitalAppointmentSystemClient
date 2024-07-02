import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserClaimComponent } from './update-user-claim.component';

describe('UpdateUserClaimComponent', () => {
  let component: UpdateUserClaimComponent;
  let fixture: ComponentFixture<UpdateUserClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateUserClaimComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateUserClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
