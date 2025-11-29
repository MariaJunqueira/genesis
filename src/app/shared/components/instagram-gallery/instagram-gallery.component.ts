import { Component } from '@angular/core';

@Component({
    selector: 'app-instagram-gallery',
    imports: [],
    templateUrl: './instagram-gallery.component.html',
    styleUrl: './instagram-gallery.component.scss'
})
export class InstagramGalleryComponent {
    // Placeholder images - in a real app these might come from an API
    images = [
        { src: 'assets/images/about-hero.jpg', class: 'span-2' },
        { src: 'assets/images/about-working.jpg', class: 'span-1' },
        { src: 'assets/images/about-couch.jpg', class: 'span-1' },
        { src: 'assets/images/about-story.jpg', class: 'span-2' },
        { src: 'assets/images/about-hero.jpg', class: 'span-2' }
    ];
}
