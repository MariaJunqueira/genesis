import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { TileComponent } from '../../../shared/components/tile/tile.component';
import { Tile } from '../../../shared/components/tile/tile.model';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, TileComponent, TranslateModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements AfterViewInit {
  services: Array<Tile> = [
    {
      title: 'home::services::webDesign::title',
      description: 'home::services::webDesign::description',
      icon: 'assets/icons/pen.svg',
    },
    {
      title: 'home::services::uiuxDesign::title',
      description: 'home::services::uiuxDesign::description',
      icon: 'assets/icons/click.svg',
    },
    {
      title: 'home::services::productDesign::title',
      description: 'home::services::productDesign::description',
      icon: 'assets/icons/light.svg',
    },
    {
      title: 'home::services::webDevelopment::title',
      description: 'home::services::webDevelopment::description',
      icon: 'assets/icons/code.svg',
    }
  ];

  // Capture references to all app-tile elements
  @ViewChildren('appTile', { read: ElementRef }) appTiles!: QueryList<ElementRef>;

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    const observerOptions = {
      root: null, // Default is viewport
      threshold: 0.1 // Trigger when 10% of the tile is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view'); // Add 'in-view' class when in viewport
        }
      });
    }, observerOptions);

    // Iterate over the tiles and observe the native elements
    this.appTiles.forEach((tile) => {
      observer.observe(tile.nativeElement); // Use nativeElement to access DOM
    });
  }
}
