import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-skills',
  imports: [TranslateModule], 
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
    { image: 'firebase', label: 'Firebase' },
    { image: 'git', label: 'Git' },
    { image: 'github', label: 'Github'},
    { image: 'scrum', label: 'Scrum'},
    { image: 'wordpress', label: 'WordPress' },
    { image: 'material-design', label: 'Material Design' },
    { image: 'api', label: 'Api'},
    { image: 'python', label: 'Python'},
    { image: 'django', label: 'Django'},
    { image: 'drf', label: 'DRF'},
    // { image: 'shell-scripting-1', label: 'Shell-Scripting'},
    { image: 'shell-scripting', label: 'Shell-Scripting'},
    { image: 'cloud', label: 'Cloud'},
    // { image: 'docker', label: 'Docker'},
    { image: 'sql', label: 'SQL'},
    { image: 'postgre-sql', label: 'PostgreSQL'},
    // { image: 'flask', label: 'Flask'},
    { image: 'continually_learning', label: 'Always expanding skills'},
  ];
}