import { Component, OnDestroy, OnInit } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { PageRequest } from '../../../../services/common/http-client.service';
import { ListFeedback } from '../../models/list-feedback';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FeeddbackDataShareService } from '../../services/feeddback-data-share.service';
import { ConfirmDeleteModalComponent } from '../confirm-delete-modal/confirm-delete-modal.component';
import { StarDisplayComponent } from '../star-display/star-display.component';

@Component({
  selector: 'app-list-feedback',
  standalone: true,
  imports: [CommonModule,ConfirmDeleteModalComponent,StarDisplayComponent],
  templateUrl: './list-feedback.component.html',
  styleUrl: './list-feedback.component.scss'
})
export class ListFeedbackComponent implements OnInit,OnDestroy{

constructor(private feedbackService:FeedbackService,private router:Router,private feedbackShareDataService:FeeddbackDataShareService){}
pageRequest: PageRequest = { page: 0, size: 10 };
feedbacks: ListFeedback[] = [];
subscriptions: Subscription[] = [];
count: number = 0;
showModal: boolean = false;
feedbacksToDelete: ListFeedback | null = null;

  ngOnInit(): void {
    this.loadFeedbacks();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadFeedbacks() {
    const feedbacksSubscription = this.feedbackService.read(this.pageRequest).subscribe({
      next: response => {
        console.log("response", response.items);
        response.items.forEach((feedback: any) => {
          console.log(`Feedback ID: ${feedback.id}, isDeleted: ${feedback.isDeleted}`);
        });
        this.feedbacks = response.items//.filter((feedback: any) => !feedback.isDeleted);
        this.count = response.count;
        console.log("feedbacks", this.feedbacks);
      },
      error: err => {
        console.error('Feedback load failed', err);
      }
    });
    this.subscriptions.push(feedbacksSubscription);
  }
  onPageChange(page: number): void {
    this.pageRequest.page = page;
    this.loadFeedbacks();
  }

  get totalPages(): number {
    return Math.ceil(this.count / this.pageRequest.size);
  }

  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }
  showFeedbackDetails(feedback: any) {
    this.feedbackShareDataService.changeFeedback(feedback);
    console.log("feed detail id", feedback.id);
    this.router.navigate(['/admin/feedback', feedback.id]);
  }

  showDeleteModal(feedback: ListFeedback) {
    this.feedbacksToDelete = feedback;
    this.showModal = true;
  }
  confirmDelete() {
    if (this.feedbacksToDelete) {
      this.feedbackService.deletefeedback(this.feedbacksToDelete.id).subscribe({
        next: () => {
          this.feedbacks = this.feedbacks.filter(d => d.id !== this.feedbacksToDelete!.id);
          this.showModal = false;
          this.feedbacksToDelete = null;
        },
        error: err => {
          console.error('Error deleting feedback:', err);
          this.showModal = false;
        }
      });
    }
  }

  cancelDelete() {
    this.showModal = false;
    this.feedbacksToDelete = null;
  }

}
