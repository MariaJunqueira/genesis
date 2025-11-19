import { CommonModule } from '@angular/common';
import { Component, effect, input, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss' // Angular 18 supports styleUrl
})
export class CarouselComponent {
  heading = input.required<string>();
  items = input.required<Array<{
    image: string;
    title: string;
    description: string;
    link: { text: string; url: string }
  }>>();

  carouselItems = signal<Array<{
    image: string;
    title: string;
    description: string;
    link: { text: string; url: string }
  }>>([]);

  currentIndex = signal(0);
  isTransitioning = signal(false);
  private slideWidth = 500; // Width of each slide
  private threshold = 150; // Threshold for drag movement
  private dragStart = 0;
  private dragEnd = 0;
  private timer: any;

  constructor() {
    effect(() => {
      this.carouselItems.set(this.items()); // Separate signal to manage the dynamic list

      this.setAutoAdvance();
    }, { allowSignalWrites: true }); // Enable signal writes within the effect
  }

  next() {
    this.shiftSlide(-1);
  }

  previous() {
    this.shiftSlide(1);
  }

  onDragStart(event: MouseEvent) {
    if (this.isTransitioning()) return;
    this.dragStart = event.pageX;
    document.addEventListener('mousemove', this.onDragging.bind(this));
    document.addEventListener('mouseup', this.onDragEnd.bind(this));
  }

  onDragging(event: MouseEvent) {
    this.dragEnd = event.pageX;
    const dragDistance = this.dragEnd - this.dragStart;
    (document.querySelector('.test') as HTMLElement).style.transform = `translateX(${dragDistance}px)`;
  }

  onDragEnd() {
    const dragDistance = this.dragEnd - this.dragStart;
    document.removeEventListener('mousemove', this.onDragging.bind(this));
    document.removeEventListener('mouseup', this.onDragEnd.bind(this));

    if (dragDistance > this.threshold) {
      this.shiftSlide(1);
    } else if (dragDistance < -this.threshold) {
      this.shiftSlide(-1);
    } else {
      this.resetSlidePosition();
    }
  }

  shiftSlide(direction: number) {
    if (this.isTransitioning()) return;
    this.isTransitioning.set(true);

    // Move the carousel in the direction specified
    const newTransform = direction * this.slideWidth;
    (document.querySelector('.test') as HTMLElement).style.transform = `translateX(${newTransform}px)`;

    setTimeout(() => {
      this.isTransitioning.set(false);
      this.currentIndex.update(index => (index - direction + this.carouselItems().length) % this.carouselItems().length);

      // Rearrange the carousel slides
      if (direction === 1) {
        const lastItem = this.carouselItems().pop();
        if (lastItem) {
          this.carouselItems.update(items => [lastItem, ...items]);
        }
      } else if (direction === -1) {
        const firstItem = this.carouselItems().shift();
        if (firstItem) {
          this.carouselItems.update(items => [...items, firstItem]);
        }
      }
      this.resetSlidePosition();
    }, 700);
  }

  resetSlidePosition() {
    // Reset the transform to zero after shifting the slides
    (document.querySelector('.test') as HTMLElement).style.transform = 'translateX(0px)';
  }

  private setAutoAdvance() {
    this.clearAutoAdvance();
    this.timer = setTimeout(() => this.shiftSlide(-1), 5000);
  }

  private clearAutoAdvance() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  ngOnDestroy() {
    this.clearAutoAdvance();
  }
}
