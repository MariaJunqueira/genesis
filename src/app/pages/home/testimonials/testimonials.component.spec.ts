import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { TestimonialsComponent } from './testimonials.component';

describe('TestimonialsComponent', () => {
    let component: TestimonialsComponent;
    let fixture: ComponentFixture<TestimonialsComponent>;
    let mockTrack: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestimonialsComponent, TranslateModule.forRoot()],
            providers: [provideZonelessChangeDetection()]
        }).compileComponents();

        fixture = TestBed.createComponent(TestimonialsComponent);
        component = fixture.componentInstance;

        // Create a real DOM element for the track
        mockTrack = document.createElement('div');
        Object.defineProperty(mockTrack, 'scrollWidth', { value: 900, writable: true });
        Object.defineProperty(mockTrack, 'scrollLeft', { value: 0, writable: true });

        // Mock first child
        const firstChild = document.createElement('div');
        Object.defineProperty(firstChild, 'offsetWidth', { value: 100 });
        mockTrack.appendChild(firstChild);

        // Spy on methods
        spyOn(mockTrack, 'scrollTo');
        spyOn(mockTrack, 'addEventListener').and.callThrough();
        spyOn(mockTrack, 'removeEventListener').and.callThrough();

        // Mock getComputedStyle
        spyOn(window, 'getComputedStyle').and.returnValue({
            gap: '0px',
            columnGap: '0px'
        } as any);

        // Install clock for setTimeout mocking
        jasmine.clock().install();

        fixture.detectChanges();

        // Trigger effect to initialize carousel items
        jasmine.clock().tick(1);

        // Inject mock track
        component.carouselTrack = { nativeElement: mockTrack };
    });

    afterEach(() => {
        jasmine.clock().uninstall();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have 3 testimonials', () => {
        expect(component.testimonials.length).toBe(3);
    });

    it('should initialize with currentIndex at middle set start (index 3)', () => {
        expect(component.realItemCount).toBe(3);
        expect(component.currentIndex()).toBe(3);
    });

    it('should have 9 carousel items (3 sets of 3)', () => {
        expect(component.carouselItems().length).toBe(9);
    });

    it('should navigate from index 3 to 4 when clicking next', () => {
        component.currentIndex.set(3); // Sophia
        mockTrack.scrollLeft = 300;

        component.next();
        jasmine.clock().tick(1);

        // Should scroll to index 4
        expect((mockTrack as any).scrollTo).toHaveBeenCalledWith({
            left: 400,
            behavior: 'smooth'
        });
    });

    it('should wrap around when navigating from index 5 (Emily) forward', () => {
        component.currentIndex.set(5); // Emily (end of middle set)
        mockTrack.scrollLeft = 500;

        component.next();

        // Should perform wrap-around:
        // 1. Instant jump to index 2 (realItemCount - 1)
        expect((mockTrack as any).scrollTo).toHaveBeenCalledWith({
            left: 200,
            behavior: 'instant'
        });

        jasmine.clock().tick(50);

        // 2. Smooth scroll to index 3 (startMiddle)
        expect((mockTrack as any).scrollTo).toHaveBeenCalledWith({
            left: 300,
            behavior: 'smooth'
        });

        // 3. After 100ms, currentIndex should be explicitly set to 3
        jasmine.clock().tick(100);
        expect(component.currentIndex()).toBe(3);
    });

    it('should complete full forward cycle: Sophia -> James -> Emily -> Sophia -> James', () => {
        // Start at Sophia (index 3)
        component.currentIndex.set(3);
        mockTrack.scrollLeft = 300;

        // Click 1: Sophia -> James
        (mockTrack as any).scrollTo.calls.reset();
        component.next();
        jasmine.clock().tick(1);

        mockTrack.scrollLeft = 400;
        (component as any).onScroll();
        expect(component.currentIndex()).toBe(4);

        // Click 2: James -> Emily
        (mockTrack as any).scrollTo.calls.reset();
        component.next();
        jasmine.clock().tick(1);

        mockTrack.scrollLeft = 500;
        (component as any).onScroll();
        expect(component.currentIndex()).toBe(5);

        // Click 3: Emily -> Sophia (wrap around)
        (mockTrack as any).scrollTo.calls.reset();
        component.next();

        // Should jump to 2, then scroll to 3
        expect((mockTrack as any).scrollTo).toHaveBeenCalledWith({ left: 200, behavior: 'instant' });
        expect((mockTrack as any).scrollTo).toHaveBeenCalledWith({ left: 300, behavior: 'smooth' });

        // Explicitly set by setTimeout after 100ms
        jasmine.clock().tick(100);
        expect(component.currentIndex()).toBe(3);

        // Click 4: Sophia -> James (THIS IS THE CRITICAL TEST!)
        (mockTrack as any).scrollTo.calls.reset();
        jasmine.clock().tick(800); // Wait for isNavigating to become false

        component.next();
        jasmine.clock().tick(1);

        // Should NOT wrap, should just scroll to index 4
        expect((mockTrack as any).scrollTo).toHaveBeenCalledWith({ left: 400, behavior: 'smooth' });
        expect((mockTrack as any).scrollTo).not.toHaveBeenCalledWith({ left: 200, behavior: 'instant' });

        mockTrack.scrollLeft = 400;
        (component as any).onScroll();
        expect(component.currentIndex()).toBe(4);
    });

    it('should wrap around when navigating from index 3 (Sophia) backward', () => {
        component.currentIndex.set(3); // Sophia (start of middle set)
        mockTrack.scrollLeft = 300;

        component.previous();

        // Should perform wrap-around:
        // 1. Instant jump to index 6 (2 * realItemCount)
        expect((mockTrack as any).scrollTo).toHaveBeenCalledWith({
            left: 600,
            behavior: 'instant'
        });

        jasmine.clock().tick(50);

        // 2. Smooth scroll to index 5 (endMiddle)
        expect((mockTrack as any).scrollTo).toHaveBeenCalledWith({
            left: 500,
            behavior: 'smooth'
        });

        // 3. After 100ms, currentIndex should be explicitly set to 5
        jasmine.clock().tick(100);
        expect(component.currentIndex()).toBe(5);
    });
});
