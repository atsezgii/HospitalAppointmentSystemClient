import { Component, OnInit } from '@angular/core';
import { OperationClaimsService } from '../../services/operation-claims.service';
import { ListOperationClaims } from '../../models/list-operation-claims';
import { PageRequest } from '../../../../services/common/http-client.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { OperationClaimShareDataService } from '../../services/operation-claim-share-data.service';
import { Router } from '@angular/router';
import { ConfirmDeleteModalComponent } from '../confirm-delete-modal/confirm-delete-modal.component';

@Component({
  selector: "app-list-claims",
  standalone: true,
  imports: [CommonModule,ConfirmDeleteModalComponent],
  templateUrl: "./list-claims.component.html",
  styleUrl: "./list-claims.component.scss"
})
export class ListClaimsComponent implements OnInit {
  pageRequest: PageRequest = { page: 0, size: 10 };
  operationClaims: ListOperationClaims[] = [];
  subscriptions: Subscription[] = [];
  count: number = 0;
  showModal: boolean = false;
  operationClaimsToDelete: ListOperationClaims | null = null;
  constructor(
    private operationClaimService: OperationClaimsService,
    private operationClaimShareDataService: OperationClaimShareDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOperationClaims();
  }

  loadOperationClaims() {
    const operationClaimsSubscription = this.operationClaimService
      .read(this.pageRequest)
      .subscribe({
        next: response => {
          console.log("response", response.items);
          response.items.forEach((operationClaim: any) => {
            console.log(
              `operationClaim ID: ${operationClaim.id}, isDeleted: ${operationClaim.isDeleted}`
            );
          });
          this.operationClaims = response.items; //.filter((operationClaim: any) => !operationClaim.isDeleted);
          this.count = response.count;
          console.log("operationClaims", this.operationClaims);
        },
        error: err => {
          console.error("Operation Claims load failed", err);
        }
      });
    this.subscriptions.push(operationClaimsSubscription);
  }
  onPageChange(page: number): void {
    this.pageRequest.page = page;
    this.loadOperationClaims();
  }

  get totalPages(): number {
    return Math.ceil(this.count / this.pageRequest.size);
  }

  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }
  showOperationClaimDetails(operationClaim: any) {
    this.operationClaimShareDataService.changeOperationClaim(operationClaim);
    console.log("claim detail id", operationClaim.id);
    this.router.navigate(["/admin/claim", operationClaim.id]);
  }

  showDeleteModal(operationClaim: ListOperationClaims) {
    this.operationClaimsToDelete = operationClaim;
    this.showModal = true;
  }
  confirmDelete() {
    if (this.operationClaimsToDelete) {
      this.operationClaimService.deleteoperationClaim(this.operationClaimsToDelete.id).subscribe({
        next: () => {
          this.operationClaims = this.operationClaims.filter(d => d.id !== this.operationClaimsToDelete!.id);
          this.showModal = false;
          this.operationClaimsToDelete = null;
        },
        error: err => {
          console.error('Error deleting operationClaim:', err);
          this.showModal = false;
        }
      });
    }
  }

  cancelDelete() {
    this.showModal = false;
    this.operationClaimsToDelete = null;
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
