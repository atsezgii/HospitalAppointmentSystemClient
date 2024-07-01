import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StarRatingComponent),
      multi: true
    }
  ]
})
export class StarRatingComponent implements OnInit, ControlValueAccessor {
  @Input() rating: number = 0;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();

  stars: boolean[] = Array(5).fill(false);

  private onChange = (rating: number) => {};
  private onTouched = () => {};

  ngOnInit() {
    this.updateStars();
  }

  writeValue(rating: number): void {
    this.rating = rating;
    this.updateStars();
  }

  registerOnChange(fn: (rating: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Burada bileşeni devre dışı bırakmak için gerekli kodu yazabilirsiniz
  }

  updateStars() {
    this.stars = this.stars.map((_, i) => i < this.rating);
  }

  selectRating(index: number) {
    this.rating = index + 1;
    this.ratingChange.emit(this.rating);
    this.onChange(this.rating);
    this.onTouched();
    this.updateStars();
  }
}
