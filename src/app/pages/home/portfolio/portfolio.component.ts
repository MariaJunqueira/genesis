import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { CarouselComponent } from '../../../shared/components/carousel/carousel.component';

@Component({
    selector: 'app-portfolio',
    imports: [CarouselComponent, TranslateModule],
    templateUrl: './portfolio.component.html',
    styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {

  items = [
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
  ]

}
