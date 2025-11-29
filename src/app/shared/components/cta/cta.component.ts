import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ButtonComponent } from '../button/button.component';

@Component({
    selector: 'app-cta',
    imports: [ButtonComponent, RouterLink],
    templateUrl: './cta.component.html',
    styleUrl: './cta.component.scss'
})
export class CtaComponent {
    heading = input.required<string>();
    description = input<string>();
    buttonText = input.required<string>();
    buttonLink = input<string>();
}
