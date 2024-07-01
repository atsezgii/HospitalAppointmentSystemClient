import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationClaimsComponent } from './operation-claims.component';

describe('OperationClaimsComponent', () => {
  let component: OperationClaimsComponent;
  let fixture: ComponentFixture<OperationClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationClaimsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OperationClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
