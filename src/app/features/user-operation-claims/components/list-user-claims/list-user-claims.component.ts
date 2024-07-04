import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageRequest } from '../../../../services/common/http-client.service';
import { Subscription } from 'rxjs';
import { UserOperationClaimService } from '../../services/user-operation-claim.service';
import { Router } from '@angular/router';
import { ListUserClaims } from '../../models/list-user-claims';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../users/services/user.service';
import { UserListApiResponse } from '../../../users/models/list-user-response';
import { ListUser } from '../../../users/models/list-user';
import { OperationClaimsService } from '../../../operation-claims/services/operation-claims.service';
import { ListOperationClaimsResponse } from '../../../operation-claims/models/list-operation-claims-response';
import { ListOperationClaims } from '../../../operation-claims/models/list-operation-claims';

@Component({
  selector: "app-list-user-claims",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./list-user-claims.component.html",
  styleUrl: "./list-user-claims.component.scss"
})
export class ListUserClaimsComponent implements OnInit,OnDestroy {
  pageRequest: PageRequest = { page: 0, size: 10 };
  userClaims: ListUserClaims[] = [];
  subscriptions: Subscription[] = [];
  count: number = 0;
  showModal: boolean = false;
  userClaimsToDelete: ListUserClaims | null = null;
  users: ListUser[] = [];
  claims: ListOperationClaims[] = [];
  usersLoaded: boolean = false;
  claimsLoaded: boolean = false;
  userClaimsLoaded: boolean = false;
  combinedData: any[] = [];
  constructor(
    private userClaimsService: UserOperationClaimService,
    private router: Router,
    private userService:UserService,
    private claimsService:OperationClaimsService
  ) {}
  ngOnInit(): void {
    this.loadUserClaims();
    this.loadClaims();
    this.loadUsers();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  loadUserClaims(){
    console.log("dfsdf");
    const userClaimsSubscription = this.userClaimsService.read(this.pageRequest).subscribe({
      next: response => {
        response.items.forEach((userClaim: any) => {
        });
        this.userClaims = response.items//.filter((userClaim: any) => !userClaim.isDeleted);
        this.count = response.count;
        this.userClaimsLoaded = true;
        this.checkDataLoaded();
      },
      error: err => {
        console.error('UserClaim load failed', err);
      }
    });
    this.subscriptions.push(userClaimsSubscription);
  }
  loadUsers() {
    const usersSubscription = this.userService.read(this.pageRequest).subscribe({
      next: (response: UserListApiResponse) => {
        this.users = response.items;
        this.usersLoaded = true;
         this.checkDataLoaded();
        console.log("users",this.users)

      },
      error: (error: any) => {
        console.error('Error loading users:', error);
      }
    });
    this.subscriptions.push(usersSubscription);
  }
  loadClaims() {
    const claimsSubscription = this.claimsService.read(this.pageRequest).subscribe({
      next: (response: ListOperationClaimsResponse) => {
        this.claims = response.items;
        this.claimsLoaded = true;
         this.checkDataLoaded();
        console.log("claims",this.claims)
      },
      error: (error: any) => {
        console.error('Error loading claims:', error);
      }
    });
    this.subscriptions.push(claimsSubscription);
  }
  checkDataLoaded(): void {
    if (this.userClaimsLoaded && this.usersLoaded && this.claimsLoaded) {
      this.combineData();
    }
  }
  combineData(): void {
    this.combinedData = this.userClaims.map(claim => {
      const user = this.users.find(u => u.id === claim.baseUserId);
      const operationClaim = this.claims.find(d => d.id === claim.operationClaimId);
      return {
        ...claim,
        userName: user ? `${user.firstName} ${user.lastName}` : 'Unknown',
        operationClaimName: operationClaim ? operationClaim.name : 'Unknown'
      };
    });
    console.log('Combined Data:', this.combinedData);
  }


  onPageChange(page: number): void {
    this.pageRequest.page = page;
    this.loadUserClaims();
  }

  get totalPages(): number {
    return Math.ceil(this.count / this.pageRequest.size);
  }

  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }
}
