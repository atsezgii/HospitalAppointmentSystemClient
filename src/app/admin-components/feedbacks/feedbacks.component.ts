import { Component } from '@angular/core';
import { ListFeedbackComponent } from '../../features/feedbacks/components/list-feedback/list-feedback.component';

@Component({
  selector: 'app-feedbacks',
  standalone: true,
  imports: [ListFeedbackComponent],
  templateUrl: './feedbacks.component.html',
  styleUrl: './feedbacks.component.scss'
})
export class FeedbacksComponent {

}
