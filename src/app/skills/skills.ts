import { Component, inject, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
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

  private currentLang = 'en';

  ngOnInit() {
    this.currentLang = localStorage.getItem('lang') || 'en';
    this.updateLine(this.currentLang);
    this.translate.onLangChange.subscribe((e) => this.updateLine(e.lang));
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateLine(this.currentLang);
  }

  /**
   * Adjusts the position of the decorative line next to the Skills headline
   * based on the current language, since German text requires a different offset.
   * @param lang - The active language code (e.g. 'en' or 'de').
   */
  private updateLine(lang: string): void {
    this.currentLang = lang;
    const line = document.querySelector('app-skills .line') as HTMLElement;
    const h1 = document.querySelector('app-skills .headline h1') as HTMLElement;
    if (!line || !h1) {
      return;
    }
    if (lang === 'de') {
      this.applyGermanLine(line, h1);
      return;
    }
    this.applyDefaultLine(line, h1);
  }

  /**
   * PROVË (jo ende definitive): njëjta teknikë universale edhe për DE,
   * në vend të translateX(150px) fiks. Nëse s'del mirë vizualisht,
   * kthehet lehtë te versioni i vjetër (shih historikun git).
   */
  private applyGermanLine(line: HTMLElement, h1: HTMLElement): void {
    this.applyUniversalLine(line, h1);
  }

  /**
   * EN/SQ: vija bëhet element normal (jo absolute) me flex-basis shumë
   * të madhe dhe flex-shrink:0 - ndjek automatikisht gjatësinë reale të
   * h1-it me gap:24px KONSTANT (nga .headline) në ÇDO gjerësi ekrani,
   * në vend të formulave fikse (absolute ose translateX) që jepnin
   * hapësirë jokonstante sipas zoom-it.
   */
  private applyDefaultLine(line: HTMLElement, h1: HTMLElement): void {
    this.applyUniversalLine(line, h1);
  }

  /**
   * Nën 1024px, font-i i h1 është më i vogël (56/36/29px) - i njëjti
   * gap prej 24px duket proporcionalisht më i madh, prandaj vija
   * afrohet edhe 12px majtas vetëm në atë zonë.
   */
  private applyUniversalLine(line: HTMLElement, h1: HTMLElement): void {
    line.style.position = 'static';
    line.style.flex = '0 0 2000px';
    line.style.marginTop = '0';
    line.style.marginLeft = window.innerWidth <= 1024 ? '-12px' : '0';
    line.style.transform = 'none';
    h1.style.flexShrink = '0';
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