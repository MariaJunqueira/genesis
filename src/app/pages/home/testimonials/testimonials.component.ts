import { Component, effect, signal, ViewChild, ElementRef, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { Testimonial } from './testimonial.model';

@Component({
    selector: 'app-testimonials',
    imports: [TranslateModule],
    templateUrl: './testimonials.component.html',
    styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent implements AfterViewInit, OnDestroy {
    @ViewChild('carouselTrack') carouselTrack!: ElementRef<HTMLElement>;

    testimonials: Testimonial[] = [
        {
            quote: 'home::testimonials::testimonial1::quote',
            name: 'home::testimonials::testimonial1::name',
            title: 'home::testimonials::testimonial1::title',
            image: 'assets/images/testimonials/client-1.jpg'
        },
        {
            quote: 'home::testimonials::testimonial2::quote',
            name: 'home::testimonials::testimonial2::name',
            title: 'home::testimonials::testimonial2::title',
            image: 'assets/images/testimonials/client-2.jpg'
        },
        {
            quote: 'home::testimonials::testimonial3::quote',
            name: 'home::testimonials::testimonial3::name',
            title: 'home::testimonials::testimonial3::title',
            image: 'assets/images/testimonials/client-3.jpg'
        }
    ];

    currentIndex = signal(0);
    carouselItems = signal<Testimonial[]>([]);

    realItemCount = 0;
    private timer: any;
    private isNavigating = false;

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        effect(() => {
            this.realItemCount = this.testimonials.length;

            if (this.realItemCount > 0) {
                // Triple the items for infinite loop
                this.carouselItems.set([...this.testimonials, ...this.testimonials, ...this.testimonials]);
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
            if (this.carouselTrack) {
                const itemWidth = this.getItemWidth();
                this.carouselTrack.nativeElement.scrollTo({ left: this.realItemCount * itemWidth, behavior: 'instant' });
            }

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

    navigateTo(targetIndex: number) {
        if (!this.carouselTrack) return;

        const track = this.carouselTrack.nativeElement;
        const itemWidth = this.getItemWidth();
        const startMiddle = this.realItemCount;
        const endMiddle = 2 * this.realItemCount - 1;

        if (targetIndex > endMiddle) {
            const jumpIndex = this.realItemCount - 1;
            this.performWrapAroundNavigation(track, itemWidth, jumpIndex, startMiddle);
        }
        else if (targetIndex < startMiddle) {
            const jumpIndex = 2 * this.realItemCount;
            this.performWrapAroundNavigation(track, itemWidth, jumpIndex, endMiddle);
        }
        else {
            track.scrollTo({ left: targetIndex * itemWidth, behavior: 'smooth' });
        }
    }

    private performWrapAroundNavigation(track: HTMLElement, itemWidth: number, jumpIndex: number, targetIndex: number) {
        this.isNavigating = true;
        track.scrollTo({ left: jumpIndex * itemWidth, behavior: 'instant' });
        track.scrollTo({ left: targetIndex * itemWidth, behavior: 'smooth' });

        this.currentIndex.set(targetIndex);

        this.resetNavigationFlag();
    }

    private resetNavigationFlag() {
        setTimeout(() => {
            this.isNavigating = false;
        }, 800); // Time to guarantee the smooth scroll is completed
    }

    private onScroll() {
        if (!this.carouselTrack || this.realItemCount === 0) return;

        const track = this.carouselTrack.nativeElement;
        const scrollLeft = track.scrollLeft;
        const itemWidth = this.getItemWidth();
        const oneSetWidth = itemWidth * this.realItemCount;

        if (this.isNavigating) return;

        const newIndex = Math.round(scrollLeft / itemWidth);
        if (this.currentIndex() !== newIndex) {
            this.currentIndex.set(newIndex);
        }

        if (scrollLeft < oneSetWidth - 10) {
            track.scrollLeft += oneSetWidth;
        }
        else if (scrollLeft > 2 * oneSetWidth + 10) {
            track.scrollLeft -= oneSetWidth;
        }

        this.startAutoAdvance();
    }

    private getItemWidth(): number {
        if (!this.carouselTrack) return 0;
        const firstChild = this.carouselTrack.nativeElement.firstElementChild as HTMLElement;
        if (!firstChild) return 0;

        const style = window.getComputedStyle(this.carouselTrack.nativeElement);
        const gap = parseFloat(style.gap || style.columnGap || '0') || 0;

        return firstChild.offsetWidth + gap;
    }

    private startAutoAdvance() {
        this.stopAutoAdvance();
        if (isPlatformBrowser(this.platformId)) {
            this.timer = setTimeout(() => {
                this.next();
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
