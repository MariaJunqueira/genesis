
import { Component, effect, input, signal, ViewChild, ElementRef, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
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

  @ViewChild('carouselTrack') carouselTrack!: ElementRef<HTMLElement>;

  private realItemCount = 0;
  private timer: any;

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
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Initial positioning: Scroll to the middle set
      // Wait a tick for layout to ensure dimensions are ready
      setTimeout(() => {
        if (this.carouselTrack) {
          const itemWidth = this.getItemWidth();
          this.carouselTrack.nativeElement.scrollTo({ left: this.realItemCount * itemWidth, behavior: 'instant' });
        }
      }, 0);

      // Add scroll listener for infinite loop
      this.carouselTrack.nativeElement.addEventListener('scroll', this.onScroll.bind(this), { passive: true });

      this.startAutoAdvance();
    }
  }





  ngOnDestroy() {
    this.stopAutoAdvance();
    if (isPlatformBrowser(this.platformId) && this.carouselTrack) {
      this.carouselTrack.nativeElement.removeEventListener('scroll', this.onScroll.bind(this));
    }
  }

  private isNavigating = false;

  next() {
    this.stopAutoAdvance();
    this.navigateTo(this.currentIndex() + 1);
    this.startAutoAdvance();
  }

  previous() {
    this.stopAutoAdvance();
    this.navigateTo(this.currentIndex() - 1);
    this.startAutoAdvance();
  }

  private navigateTo(targetIndex: number) {
    if (!this.carouselTrack) return;

    const track = this.carouselTrack.nativeElement;
    const itemWidth = this.getItemWidth();

    // Boundaries of the Middle Set
    const startMiddle = this.realItemCount;
    const endMiddle = 2 * this.realItemCount - 1;

    // Case 1: Moving Forward from End of Middle -> Start of Middle
    if (targetIndex > endMiddle) {
      this.isNavigating = true;
      // Jump to End of First Set (equivalent to End of Middle)
      const jumpIndex = this.realItemCount - 1;
      track.scrollTo({ left: jumpIndex * itemWidth, behavior: 'instant' });

      // Scroll to Start of Middle
      setTimeout(() => {
        track.scrollTo({ left: startMiddle * itemWidth, behavior: 'smooth' });
        this.resetNavigationFlag();
      }, 50); // Small delay to ensure jump renders
    }
    // Case 2: Moving Backward from Start of Middle -> End of Middle
    else if (targetIndex < startMiddle) {
      this.isNavigating = true;
      // Jump to Start of Last Set (equivalent to Start of Middle)
      const jumpIndex = 2 * this.realItemCount;
      track.scrollTo({ left: jumpIndex * itemWidth, behavior: 'instant' });

      // Scroll to End of Middle
      setTimeout(() => {
        track.scrollTo({ left: endMiddle * itemWidth, behavior: 'smooth' });
        this.resetNavigationFlag();
      }, 50);
    }
    // Case 3: Normal Navigation within bounds (or safe zones)
    else {
      track.scrollTo({ left: targetIndex * itemWidth, behavior: 'smooth' });
    }
  }

  private resetNavigationFlag() {
    setTimeout(() => {
      this.isNavigating = false;
    }, 600); // Match scroll duration approx
  }

  private onScroll() {
    if (!this.carouselTrack || this.realItemCount === 0) return;

    const track = this.carouselTrack.nativeElement;
    const scrollLeft = track.scrollLeft;
    const itemWidth = this.getItemWidth();
    const oneSetWidth = itemWidth * this.realItemCount;

    // Update current index for UI
    const newIndex = Math.round(scrollLeft / itemWidth);
    if (this.currentIndex() !== newIndex) {
      this.currentIndex.set(newIndex);
    }

    // Skip infinite loop logic if we are in a controlled navigation
    if (this.isNavigating) return;

    // Infinite Loop Logic
    if (scrollLeft < oneSetWidth - 10) {
      track.scrollLeft += oneSetWidth;
    }
    else if (scrollLeft > 2 * oneSetWidth + 10) {
      track.scrollLeft -= oneSetWidth;
    }

    // Reset auto-advance timer
    this.startAutoAdvance();
  }

  private getItemWidth(): number {
    if (!this.carouselTrack) return 0;
    const firstChild = this.carouselTrack.nativeElement.firstElementChild as HTMLElement;
    if (!firstChild) return 0;

    // Width + Gap
    const style = window.getComputedStyle(this.carouselTrack.nativeElement);
    const gap = parseFloat(style.gap || style.columnGap || '0') || 0;

    return firstChild.offsetWidth + gap;
  }

  private startAutoAdvance() {
    this.stopAutoAdvance();
    if (isPlatformBrowser(this.platformId)) {
      // Use setTimeout for debouncing
      this.timer = setTimeout(() => {
        this.next(); // Use next() to trigger the robust navigation logic
      }, 5000);
    }
  }

  private stopAutoAdvance() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}

