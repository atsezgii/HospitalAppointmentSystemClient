import { Component, OnInit } from '@angular/core';
import { ListFeedback } from '../../models/list-feedback';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FeedbackService } from '../../services/feedback.service';
import { AlertifyService } from '../../../../services/alertify/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FeeddbackDataShareService } from '../../services/feeddback-data-share.service';
import { MessageType } from '../../../../services/alertify/enums/MessageType';
import { Position } from '../../../../services/alertify/enums/Position';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-update-feedback',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,StarRatingComponent],
  templateUrl: './update-feedback.component.html',
  styleUrl: './update-feedback.component.scss'
})
export class UpdateFeedbackComponent implements OnInit{

  feedbackDetailFormGroup: FormGroup;
  feedback: ListFeedback;
  userId:string;
  constructor(private formBuilder: FormBuilder,
    private feedbacktService:FeedbackService,
    private alertify: AlertifyService,
    private router: Router,
    private route: ActivatedRoute,
    private feedbackDataShareService: FeeddbackDataShareService,
    private authService:AuthService
  ){}
  ngOnInit(): void {
    this.createForm();
    this.getDetailOfFeedbacks();
    this.getCurrentUser();

  }

  private createForm() {
    this.feedbackDetailFormGroup = this.formBuilder.group({
      id: ["", Validators.required],
      title: ["",[Validators.required]],
      description: ["",[Validators.required]],
      rating: [0, [Validators.required]]
    });
  }
  getCurrentUser(){
    this.userId = this.authService.getCurrentUserId();
    console.log('Current User ID:', this.userId);
  }
  private getDetailOfFeedbacks() {
    this.route.paramMap.subscribe(params => {
      const feedbackId = +params.get("id");
      console.log("feedbackId",feedbackId)
      this.feedbackDataShareService.currentFeedback.subscribe(feedback => {
        if (feedback && feedback.id === feedbackId) {
          this.feedback = feedback;
          this.feedbackDetailFormGroup.patchValue(feedback);
        }
      });
    });
  }

  updateFeedback() {
    const formData = this.feedbackDetailFormGroup.value;
    formData.userId = this.userId;
    this.feedbacktService.updateFeedback(formData).subscribe(
      response => {
        console.log('Feedback updated:', response);
        this.alertify.message("Success", {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.TopRight
        });
        this.router.navigate(['/admin/feedbacks']);
      },
      error => {
        console.error('Feedback could not be updated:', error);
        this.alertify.message("Form is not valid", {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
      }
    );
  }
  onSubmit() {
    if (this.feedbackDetailFormGroup.invalid) {
      this.alertify.message("Form is not valid", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
      return;
    }
    this.updateFeedback();
  }
}
