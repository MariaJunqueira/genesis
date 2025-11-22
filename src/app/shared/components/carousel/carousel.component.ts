
import { Component, effect, input, signal, ViewChild, ElementRef, AfterViewInit, OnDestroy, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-carousel',
  imports: [TranslateModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss' // Angular 18 supports styleUrl
})
export class CarouselComponent implements AfterViewInit, OnDestroy {
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

  @ViewChild('carouselTrack') carouselTrack!: ElementRef<HTMLElement>;

  private slideWidth = 0; // Dynamic width
  private gap = 23; // Gap between slides
  private threshold = 100; // Threshold for drag movement
  private startX = 0;
  private currentTranslate = 0;
  private prevTranslate = 0;
  private isDragging = false;
  private timer: any;
  private animationID: number = 0;
  private realItemCount = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    effect(() => {
      const originalItems = this.items();
      this.realItemCount = originalItems.length;

      if (this.realItemCount > 0) {
        // Triple the items for infinite loop
        this.carouselItems.set([...originalItems, ...originalItems, ...originalItems]);
        // Start at the beginning of the middle set
        this.currentIndex.set(this.realItemCount);
      } else {
        this.carouselItems.set([]);
        this.currentIndex.set(0);
      }

      // We can't measure width here yet, wait for AfterViewInit
      this.startAutoAdvance();
    });
  }

  ngAfterViewInit() {
    this.updateDimensions();
    this.startAutoAdvance();

    // Initial positioning without transition
    if (this.carouselTrack) {
      this.carouselTrack.nativeElement.style.transition = 'none';
      this.updateTransform();
      // Force reflow
      this.carouselTrack.nativeElement.offsetHeight;
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.updateDimensions();
  }

  private updateDimensions() {
    if (isPlatformBrowser(this.platformId) && this.carouselTrack) {
      const firstSlide = this.carouselTrack.nativeElement.firstElementChild as HTMLElement;
      if (firstSlide) {
        this.slideWidth = firstSlide.offsetWidth;
        this.updateTransform();
      }
    }
  }

  ngOnDestroy() {
    this.stopAutoAdvance();
    if (isPlatformBrowser(this.platformId)) {
      cancelAnimationFrame(this.animationID);
      // Ensure listeners are removed if destroyed during drag
      window.removeEventListener('mousemove', this.onDragging);
      window.removeEventListener('mouseup', this.onDragEnd);
      window.removeEventListener('mouseleave', this.onDragEnd);
      window.removeEventListener('touchmove', this.onDragging);
      window.removeEventListener('touchend', this.onDragEnd);
    }
  }

  next() {
    this.stopAutoAdvance();
    this.shiftSlide(1);
    this.startAutoAdvance();
  }

  previous() {
    this.stopAutoAdvance();
    this.shiftSlide(-1);
    this.startAutoAdvance();
  }

  shiftSlide(direction: number) {
    const totalItems = this.carouselItems().length;
    if (totalItems === 0) return;

    let newIndex = this.currentIndex() + direction;

    // Allow going out of bounds of the middle set, we snap later
    this.currentIndex.set(newIndex);

    if (this.carouselTrack) {
      this.carouselTrack.nativeElement.style.transition = 'transform 0.7s ease-in-out';
    }
    this.updateTransform();
  }

  onTransitionEnd() {
    this.checkIndex();
  }

  private checkIndex() {
    const index = this.currentIndex();
    const totalItems = this.carouselItems().length;

    // If we are in the first set (clone of last), snap to middle set
    if (index < this.realItemCount) {
      this.snapTo(index + this.realItemCount);
    }
    // If we are in the last set (clone of first), snap to middle set
    else if (index >= 2 * this.realItemCount) {
      this.snapTo(index - this.realItemCount);
    }
  }

  private snapTo(index: number) {
    if (!this.carouselTrack) return;

    this.currentIndex.set(index);
    this.carouselTrack.nativeElement.style.transition = 'none';
    this.updateTransform();

    // Force reflow
    this.carouselTrack.nativeElement.offsetHeight;

    // Transition will be re-enabled on next move
  }

  private updateTransform() {
    if (!this.carouselTrack) return;
    const offset = -(this.currentIndex() * (this.slideWidth + this.gap));
    this.currentTranslate = offset;
    this.prevTranslate = offset;
    this.setSliderPosition();
  }

  private setSliderPosition() {
    if (this.carouselTrack) {
      this.carouselTrack.nativeElement.style.transform = `translateX(${this.currentTranslate}px)`;
    }
  }

  // Drag / Touch Logic

  onDragStart(event: MouseEvent | TouchEvent) {
    this.isDragging = true;
    this.stopAutoAdvance();

    if (event instanceof MouseEvent) {
      this.startX = event.pageX;
    } else {
      this.startX = event.touches[0].clientX;
    }

    this.animationID = requestAnimationFrame(this.animation.bind(this));

    if (isPlatformBrowser(this.platformId)) {
      const moveEvent = event instanceof MouseEvent ? 'mousemove' : 'touchmove';
      const endEvent = event instanceof MouseEvent ? 'mouseup' : 'touchend';

      window.addEventListener(moveEvent, this.onDragging);
      window.addEventListener(endEvent, this.onDragEnd);

      // Also handle mouseleave as end for mouse
      if (event instanceof MouseEvent) {
        window.addEventListener('mouseleave', this.onDragEnd);
      }
    }

    if (this.carouselTrack) {
      this.carouselTrack.nativeElement.style.transition = 'none';
      this.carouselTrack.nativeElement.classList.add('dragging');
    }
  }

  // Use arrow function to bind 'this' automatically for event listeners
  private onDragging = (event: Event) => {
    if (!this.isDragging) return;

    let currentX = 0;
    if (event instanceof MouseEvent) {
      currentX = event.pageX;
    } else if (event instanceof TouchEvent) {
      currentX = event.touches[0].clientX;
    }

    const diff = currentX - this.startX;
    this.currentTranslate = this.prevTranslate + diff;
  }

  private onDragEnd = () => {
    this.isDragging = false;
    cancelAnimationFrame(this.animationID);

    const movedBy = this.currentTranslate - this.prevTranslate;

    // Remove listeners
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('mousemove', this.onDragging);
      window.removeEventListener('mouseup', this.onDragEnd);
      window.removeEventListener('mouseleave', this.onDragEnd);
      window.removeEventListener('touchmove', this.onDragging);
      window.removeEventListener('touchend', this.onDragEnd);
    }

    if (this.carouselTrack) {
      this.carouselTrack.nativeElement.style.transition = 'transform 0.7s ease-in-out';
      this.carouselTrack.nativeElement.classList.remove('dragging');
    }

    if (movedBy < -this.threshold) {
      this.shiftSlide(1);
    } else if (movedBy > this.threshold) {
      this.shiftSlide(-1);
    } else {
      this.updateTransform(); // Snap back
    }

    this.startAutoAdvance();
  }

  private animation() {
    this.setSliderPosition();
    if (this.isDragging) {
      requestAnimationFrame(this.animation.bind(this));
    }
  }

  private startAutoAdvance() {
    this.stopAutoAdvance();
    if (isPlatformBrowser(this.platformId)) {
      this.timer = setInterval(() => {
        this.shiftSlide(1);
      }, 5000);
    }
  }

  private stopAutoAdvance() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
