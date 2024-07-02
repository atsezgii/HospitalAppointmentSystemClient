import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserClaimsComponent } from './list-user-claims.component';

describe('ListUserClaimsComponent', () => {
  let component: ListUserClaimsComponent;
  let fixture: ComponentFixture<ListUserClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListUserClaimsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListUserClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
