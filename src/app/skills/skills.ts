import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-skills',
  imports: [TranslateModule, RouterLink], 
  templateUrl: './skills.html',
  styleUrls: ['./skills.scss']
})
export class Skills implements OnInit {
  private translate = inject(TranslateService);
  private cdr = inject(ChangeDetectorRef);
  isGerman = false;

  ngOnInit() {
    this.updateLine(localStorage.getItem('lang') || 'en');
    this.translate.onLangChange.subscribe((e) => this.updateLine(e.lang));
  }

  /**
   * Adjusts the position of the decorative line next to the Skills headline
   * based on the current language, since German text requires a different offset.
   * @param lang - The active language code (e.g. 'en' or 'de').
   */
  private updateLine(lang: string): void {
    const line = document.querySelector('app-skills .line') as HTMLElement;
    if (!line) {
      return;
    }
    if (lang === 'de') {
      line.style.right = '';
      line.style.left = '';
      line.style.width = '';
      line.style.transform = 'translateX(150px)';
    } else {
      line.style.transform = '';
    }
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