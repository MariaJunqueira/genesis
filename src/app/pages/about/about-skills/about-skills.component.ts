import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

interface SkillCategory {
  icon: string;
  name: string;
  items: string[];
}

@Component({
  selector: 'app-about-skills',
  imports: [TranslateModule],
  templateUrl: './about-skills.component.html',
  styleUrl: './about-skills.component.scss',
})
export class AboutSkillsComponent {
  @Input() skillCategories: SkillCategory[] = [];
}
