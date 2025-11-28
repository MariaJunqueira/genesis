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
      heading: 'home::resume::parkbee::company',
      title: 'home::resume::parkbee::title',
      subtitle: 'home::resume::parkbee::subtitle',
      description: 'home::resume::parkbee::description',
    },
    {
      heading: 'home::resume::25friday::company',
      title: 'home::resume::25friday::title',
      subtitle: 'home::resume::25friday::subtitle',
      description: 'home::resume::25friday::description',
    },
    {
      heading: 'home::resume::natixis::company',
      title: 'home::resume::natixis::title',
      subtitle: 'home::resume::natixis::subtitle',
      description: 'home::resume::natixis::description',
    },
    {
      heading: 'home::resume::pravaler::company',
      title: 'home::resume::pravaler::title',
      subtitle: 'home::resume::pravaler::subtitle',
      description: 'home::resume::pravaler::description',
    },
  ];
}
