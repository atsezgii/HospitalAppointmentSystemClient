import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-display.component.html',
  styleUrl: './star-display.component.scss'
})
export class StarDisplayComponent implements OnInit {
  @Input() rating: number = 0;
  stars: boolean[] = Array(5).fill(false);

  ngOnInit() {
    this.updateStars();
  }

  updateStars() {
    this.stars = this.stars.map((_, i) => i < this.rating);
  }
}
