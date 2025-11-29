import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { Testimonial } from '../testimonial.model';

@Component({
  selector: 'app-testimonial-card',
  imports: [TranslateModule],
  templateUrl: './testimonial-card.component.html',
  styleUrl: './testimonial-card.component.scss',
})
export class TestimonialCardComponent {
  @Input() testimonial!: Testimonial;
}
