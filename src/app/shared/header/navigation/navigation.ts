import { Component, EventEmitter, Input, Output, inject, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './navigation.html',
  styleUrls: ['./navigation.scss']
})
export class Navigation implements OnInit {
  private translate = inject(TranslateService);


  @Input() isMobile = false;
  @Output() linkClicked = new EventEmitter<void>();

  currentLang = 'en';
  activeLink = '';

  ngOnInit() {
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      this.switchLanguage(savedLang);
    } else {
      this.switchLanguage(this.translate.getDefaultLang() || 'en');
    }
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
    localStorage.setItem('lang', lang);
  }

  handleClick(linkId: string) {
    this.activeLink = linkId;
    this.linkClicked.emit();
  }

  isActive(linkId: string): boolean {
    return this.activeLink === linkId;
  }
}
