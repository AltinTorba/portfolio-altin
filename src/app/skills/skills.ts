import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-skills',
  imports: [TranslateModule], // Nuk duhet CommonModule në Angular 17+ për kontrollet e template
  templateUrl: './skills.html',
  styleUrls: ['./skills.scss']
})
export class Skills {

  hoveredSkill: string | null = null;

  skills = [
    { image: 'html', label: 'HTML' },
    { image: 'css', label: 'CSS' },
    { image: 'javascript', label: 'JavaScript' },
    { image: 'typescript', label: 'TypeScript' },
    { image: 'angular', label: 'Angular' },
    // { image: 'firebase', label: 'Firebase' },
    { image: 'git', label: 'Git' },
    // { image: 'restapi', label: 'Rest Api' },
    // { image: 'scrum', label: 'Scrum' },
    // { image: 'material', label: 'Material Design' },
    { image: 'learn', label: 'Always expanding skills' },
  ];
}