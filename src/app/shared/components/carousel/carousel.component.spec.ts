import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { CarouselComponent } from './carousel.component';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;
  let mockTrack: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselComponent, TranslateModule.forRoot()],
      providers: [provideZonelessChangeDetection()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;

    // Create a real DOM element for the track
    mockTrack = document.createElement('div');
    Object.defineProperty(mockTrack, 'scrollWidth', { value: 600, writable: true });
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

    fixture.componentRef.setInput('heading', 'Test Heading');
    fixture.componentRef.setInput('items', []);

    // Install clock for setTimeout mocking
    jasmine.clock().install();

    fixture.detectChanges();

    // Inject mock track
    component.carouselTrack = { nativeElement: mockTrack };
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should cycle next correctly', () => {
    const items = [
      { image: '', title: '1', description: '', link: { text: '', url: '' } },
      { image: '', title: '2', description: '', link: { text: '', url: '' } }
    ];
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();

    // Trigger effect
    jasmine.clock().tick(1);

    expect(component.currentIndex()).toBe(2);

    // Test Next: 2 -> 3
    component.next();
    jasmine.clock().tick(1); // Allow setTimeout in startAutoAdvance

    expect((mockTrack as any).scrollTo).toHaveBeenCalledWith({ left: 300, behavior: 'smooth' });

    // Simulate Scroll Event
    mockTrack.scrollLeft = 300;
    (component as any).onScroll();

    expect(component.currentIndex()).toBe(3);
  });

  it('should handle wrap-around next correctly', () => {
    const items = [
      { image: '', title: '1', description: '', link: { text: '', url: '' } },
      { image: '', title: '2', description: '', link: { text: '', url: '' } }
    ];
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();
    jasmine.clock().tick(1);

    // Move to end of middle set (index 3)
    component.currentIndex.set(3);
    mockTrack.scrollLeft = 300;

    // Next: 3 -> 4 (Wrap around)
    // 4 > endMiddle (3) -> True
    component.next();

    // 1. Jump to index 1 (instant)
    expect((mockTrack as any).scrollTo).toHaveBeenCalledWith({ left: 100, behavior: 'instant' });

    jasmine.clock().tick(50); // Wait for setTimeout

    // 2. Scroll to index 2 (smooth)
    expect((mockTrack as any).scrollTo).toHaveBeenCalledWith({ left: 200, behavior: 'smooth' });

    // Simulate final scroll
    mockTrack.scrollLeft = 200;
    (component as any).onScroll();

    expect(component.currentIndex()).toBe(2);
  });

  it('should handle wrap-around previous correctly', () => {
    const items = [
      { image: '', title: '1', description: '', link: { text: '', url: '' } },
      { image: '', title: '2', description: '', link: { text: '', url: '' } }
    ];
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();
    jasmine.clock().tick(1);

    // Start of middle set (index 2)
    expect(component.currentIndex()).toBe(2);

    // Previous: 2 -> 1 (Wrap around)
    // 1 < startMiddle (2) -> True
    component.previous();

    // 1. Jump to index 4 (instant)
    expect((mockTrack as any).scrollTo).toHaveBeenCalledWith({ left: 400, behavior: 'instant' });

    jasmine.clock().tick(50); // Wait for setTimeout

    // 2. Scroll to index 3 (smooth)
    expect((mockTrack as any).scrollTo).toHaveBeenCalledWith({ left: 300, behavior: 'smooth' });

    // Simulate final scroll
    mockTrack.scrollLeft = 300;
    (component as any).onScroll();

    expect(component.currentIndex()).toBe(3);
  });
});
