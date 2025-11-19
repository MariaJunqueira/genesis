import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { ButtonComponent } from '../../../shared/components/button/button.component';
import { TileGridComponent } from '../../../shared/components/tile-grid/tile-grid.component';
import { Tile } from '../../../shared/components/tile/tile.model';

@Component({
    selector: 'app-resume',
    imports: [ButtonComponent, TileGridComponent, TranslateModule],
    templateUrl: './resume.component.html',
    styleUrl: './resume.component.scss'
})
export class ResumeComponent {
  tiles: Array<Tile> = [
    {
      heading: 'home::services::webDesign::heading',
      title: 'home::services::webDesign::title',
      subtitle: 'home::services::webDesign::subtitle',
      description: 'home::services::webDesign::description',
    },
    {
      heading: 'home::services::uiuxDesign::heading',
      title: 'home::services::uiuxDesign::title',
      subtitle: 'home::services::uiuxDesign::subtitle',
      description: 'home::services::uiuxDesign::description',
    },
    {
      heading: 'home::services::productDesign::heading',
      title: 'home::services::productDesign::title',
      subtitle: 'home::services::productDesign::subtitle',
      description: 'home::services::productDesign::description',
    },
    {
      heading: 'home::services::webDevelopment::heading',
      title: 'home::services::webDevelopment::title',
      subtitle: 'home::services::webDevelopment::subtitle',
      description: 'home::services::webDevelopment::description',
    }
  ];
}
