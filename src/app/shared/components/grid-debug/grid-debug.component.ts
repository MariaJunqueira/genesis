import { Component, HostBinding, HostListener } from '@angular/core';

@Component({
  selector: 'app-grid-debug',
  standalone: true,
  imports: [],
  templateUrl: './grid-debug.component.html',
  styleUrls: ['./grid-debug.component.scss'],
})
export class GridDebugComponent {
  @HostBinding('style.display') display: string = 'none';

  @HostListener('window:keydown.control.g', ['$event'])
  onControlG(event: KeyboardEvent) {
    console.log(event);

    event.preventDefault();
    this.display = this.display === 'none' ? 'block' : 'none';
  }
}
