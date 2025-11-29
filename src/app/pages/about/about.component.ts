import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TileGridComponent } from '../../shared/components/tile-grid/tile-grid.component';
import { Tile } from '../../shared/components/tile/tile.model';
import { InstagramGalleryComponent } from '../../shared/components/instagram-gallery/instagram-gallery.component';

@Component({
    selector: 'app-about',
    imports: [TranslateModule, TileGridComponent, InstagramGalleryComponent],
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss'
})
export class AboutComponent {
    resumeTiles: Tile[] = [
        {
            title: 'Mobile Product Designer',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas bibendum sit dolor dregoneml adi.'
        },
        {
            title: 'UI / UX Designer',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas bibendum sit dolor dregoneml adi.'
        },
        {
            title: 'VP of Design',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas bibendum sit dolor dregoneml adi.'
        },
        {
            title: 'Head of Product Design',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas bibendum sit dolor dregoneml adi.'
        },
        {
            title: 'Web Designer',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas bibendum sit dolor dregoneml adi.'
        },
        {
            title: 'Mobile UI Designer',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas bibendum sit dolor dregoneml adi.'
        }
    ];

    skillCategories = [
        {
            icon: 'assets/icons/pen.svg',
            name: 'Product Design',
            items: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'UI/UX Principles']
        },
        {
            icon: 'assets/icons/code.svg',
            name: 'Development',
            items: ['HTML5 & CSS3', 'Angular', 'TypeScript', 'SASS/SCSS', 'Git & GitHub']
        },
        {
            icon: 'assets/icons/light.svg',
            name: 'Strategy',
            items: ['User Research', 'Prototyping', 'Design Systems', 'Agile Methodology', 'SEO Best Practices']
        }
    ];
}
