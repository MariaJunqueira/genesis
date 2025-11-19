import { Component, input } from '@angular/core';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {
  data = input.required<{
    image: string;
    title: string;
    description: string;
    link: {
      text: string;
      url: string;
    };
  }>()
}
