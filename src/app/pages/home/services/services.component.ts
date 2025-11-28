
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
      title: 'home::services::frontend::title',
      description: 'home::services::frontend::description',
      icon: 'assets/icons/code.svg',
    },
    {
      title: 'home::services::cloud::title',
      description: 'home::services::cloud::description',
      icon: 'assets/icons/light.svg',
    },
    {
      title: 'home::services::practices::title',
      description: 'home::services::practices::description',
      icon: 'assets/icons/pen.svg',
    }
  ];
}
