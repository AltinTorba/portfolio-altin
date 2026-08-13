import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-skills',
  imports: [TranslateModule], 
  templateUrl: './skills.html',
  styleUrls: ['./skills.scss']
})
export class Skills implements OnInit {
  private translate = inject(TranslateService);
  private cdr = inject(ChangeDetectorRef);
  isGerman = false;

  ngOnInit() {
    const updateLine = (lang: string) => {
      const line = document.querySelector('app-skills .line') as HTMLElement;
      if (line) {
        if (lang === 'de') {
        line.style.right = '';
        line.style.left = '';
        line.style.width = '';
        line.style.transform = 'translateX(150px)';
      } else {
        line.style.transform = '';
      }
      }
    };
    updateLine(localStorage.getItem('lang') || 'en');
    this.translate.onLangChange.subscribe(e => updateLine(e.lang));
  }

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
    { image: 'shell-scripting', label: 'Shell-Scripting'},
    { image: 'cloud', label: 'Cloud'},
    { image: 'sql', label: 'SQL'},
    { image: 'postgre-sql', label: 'PostgreSQL'},
    { image: 'continually_learning', label: 'Always expanding skills'},
  ];
}