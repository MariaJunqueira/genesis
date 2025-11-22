import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { CarouselComponent } from './carousel.component';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselComponent, TranslateModule.forRoot()],
      providers: [provideZonelessChangeDetection()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('heading', 'Test Heading');
    fixture.componentRef.setInput('items', []);
    fixture.detectChanges();
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

    // Initial index should be items.length (2)
    expect(component.currentIndex()).toBe(2);

    component.next();
    expect(component.currentIndex()).toBe(3);

    component.next();
    expect(component.currentIndex()).toBe(4);

    // Simulate transition end to snap back if needed (though 4 is start of last set, so it waits until 2*length to snap usually, or if we just moved to it)
    // In our logic: if index >= 2 * realItemCount (4), it snaps.
    // So at 4, it should snap to 4 - 2 = 2.
    component.onTransitionEnd();
    expect(component.currentIndex()).toBe(2);
  });

  it('should cycle previous correctly', () => {
    const items = [
      { image: '', title: '1', description: '', link: { text: '', url: '' } },
      { image: '', title: '2', description: '', link: { text: '', url: '' } }
    ];
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();

    expect(component.currentIndex()).toBe(2);

    component.previous();
    expect(component.currentIndex()).toBe(1);

    // At 1 (which is < realItemCount), it should snap to 1 + 2 = 3
    component.onTransitionEnd();
    expect(component.currentIndex()).toBe(3);
  });
});
