import { Component, input } from '@angular/core';

export interface SocialLink {
    platform: string;
    url: string;
    icon?: string; // We might use text or icon classes later
    label: string;
}

@Component({
    selector: 'app-social-links',
    imports: [],
    templateUrl: './social-links.component.html',
    styleUrl: './social-links.component.scss'
})
export class SocialLinksComponent {
    links = input<SocialLink[]>([
        { platform: 'instagram', url: 'https://instagram.com', label: 'Instagram' },
        { platform: 'linkedin', url: 'https://linkedin.com', label: 'LinkedIn' },
        { platform: 'github', url: 'https://github.com', label: 'GitHub' },
        { platform: 'twitter', url: 'https://twitter.com', label: 'Twitter' }
    ]);
}
