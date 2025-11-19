import { CommonModule } from '@angular/common';
import { Component, effect, Input, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  @Input() heading: string = 'Heading level 2';
  @Input() items: {
    image: string;
    title: string;
    description: string;
    link: { text: string; url: string }
  }[] = [
      {
        image: '/assets/images/portfolio-1.jpg',
        title: 'Sample Item 1',
        description: 'This is a description for Sample Item 1.',
        link: {
          text: 'Learn More',
          url: 'https://example.com/item1'
        }
      },
      {
        image: '/assets/images/portfolio-2.jpg',
        title: 'Sample Item 2',
        description: 'This is a description for Sample Item 2.',
        link: {
          text: 'Learn More',
          url: 'https://example.com/item2'
        }
      },
      {
        image: '/assets/images/portfolio-3.jpg',
        title: 'Sample Item 3',
        description: 'This is a description for Sample Item 3.',
        link: {
          text: 'Learn More',
          url: 'https://example.com/item3'
        }
      },
      {
        image: '/assets/images/portfolio-4.png',
        title: 'Sample Item 4',
        description: 'This is a description for Sample Item 4.',
        link: {
          text: 'Learn More',
          url: 'https://example.com/item3'
        }
      }
    ];
  currentIndex = signal(0);

  constructor() {
    effect(() => {
      setTimeout(() => this.next(), 5000);
    });
  }

  next() {
    this.currentIndex.update(index => (index + 1) % this.items.length);
  }

  previous() {
    this.currentIndex.update(index => (index - 1 + this.items.length) % this.items.length);
  }

}
