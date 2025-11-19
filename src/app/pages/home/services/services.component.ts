
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { ButtonComponent } from '../../../shared/components/button/button.component';
import { TileGridComponent } from '../../../shared/components/tile-grid/tile-grid.component';
import { Tile } from '../../../shared/components/tile/tile.model';

@Component({
    selector: 'app-services',
    imports: [ButtonComponent, TileGridComponent, TranslateModule],
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
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
}
