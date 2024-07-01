import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeedbackService } from '../../services/feedback.service';
import { AlertifyService } from '../../../../services/alertify/alertify.service';
import { MessageType } from '../../../../services/alertify/enums/MessageType';
import { Position } from '../../../../services/alertify/enums/Position';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-add-feeedback',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,StarRatingComponent],
  templateUrl: './add-feeedback.component.html',
  styleUrl: './add-feeedback.component.scss'
})
export class AddFeeedbackComponent implements OnInit{

  feedbackFormGroup: FormGroup;
  initialRating: number = 3; // Başlangıçta göstermek istediğiniz yıldız sayısı
  userId:string;
  constructor(
    private formBuilder: FormBuilder,
    private feedbackService: FeedbackService,
    private alertify: AlertifyService,
    private authService:AuthService
  ) {}
  ngOnInit(): void {
    this.createForm();
    this.getCurrentUser();
  }
  private createForm() {
    this.feedbackFormGroup = this.formBuilder.group({
      title: ["",[Validators.required]],
      description: ["",[Validators.required]],
      rating: [0,[Validators.required]],  // Rating için form kontrolü ekleniyor
      userId:[""]
    });
  }
  getCurrentUser(){
    this.userId = this.authService.getCurrentUserId();
    console.log('Current User ID:', this.userId);
  }
  addFeedback(
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    if (this.feedbackFormGroup.valid) {
      const formData = this.feedbackFormGroup.value;
        formData.userId = this.userId;
      this.feedbackService.create(
        formData,
        successCallBack,
        errorCallBack
      );
      console.log("va", this.feedbackFormGroup.value)
      this.alertify.message("Success", {
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.TopRight
      });
      this.feedbackFormGroup.reset();
    } else {
      this.alertify.message("Form is not valid", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
    }
    if (errorCallBack) {
      this.alertify.message("Form is not valid", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
    }
  }
  onFormSubmit() {
    console.log('Form submitted:', this.feedbackFormGroup.value);
    if (this.feedbackFormGroup.invalid) {
      this.alertify.message("Form is not valid", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
      return;
    }
    this.addFeedback();
  }
}
