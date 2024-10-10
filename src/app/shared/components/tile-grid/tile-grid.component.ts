import { CommonModule } from '@angular/common';
import { Component, ElementRef, input, QueryList, ViewChildren } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { TileComponent } from '../tile/tile.component';
import { Tile } from '../tile/tile.model';

@Component({
  selector: 'app-tile-grid',
  standalone: true,
  imports: [CommonModule, TileComponent, TranslateModule],
  templateUrl: './tile-grid.component.html',
  styleUrl: './tile-grid.component.scss'
})
export class TileGridComponent {
  tiles = input.required<Tile[]>();

  @ViewChildren('appTile', { read: ElementRef }) appTiles!: QueryList<ElementRef>;

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    const observerOptions = {
      root: null,
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, observerOptions);

    this.appTiles.forEach((tile) => {
      observer.observe(tile.nativeElement);
    });
  }
}
