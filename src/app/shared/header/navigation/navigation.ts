import { Component, EventEmitter, Input, Output, inject, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [TranslateModule, RouterLink],
  templateUrl: './navigation.html',
  styleUrls: ['./navigation.scss']
})
export class Navigation implements OnInit {
  private translate = inject(TranslateService);


  @Input() isMobile = false;
  @Output() linkClicked = new EventEmitter<void>();

  currentLang = 'en';
  activeLink = '';

  /**
   * Initializes the navigation language on component load. Restores the
   * language saved in localStorage, or falls back to the app's default.
   */
  ngOnInit() {
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      this.switchLanguage(savedLang);
    } else {
      this.switchLanguage(this.translate.getDefaultLang() || 'en');
    }
  }

  /**
   * Switches the active language, persists the choice to localStorage,
   * and updates the body class so language-specific styles can apply.
   * @param lang - The language code to switch to (e.g. 'en' or 'de').
   */
  switchLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
    localStorage.setItem('lang', lang);
    document.body.classList.remove('lang-de', 'lang-en', 'lang-sq');
    document.body.classList.add('lang-' + lang);
  }

  /**
   * Marks the given link as active and notifies the parent component
   * that a navigation link was clicked (e.g. to close a mobile menu).
   * @param linkId - The identifier of the clicked navigation link.
   */
  handleClick(linkId: string) {
    this.activeLink = linkId;
    this.linkClicked.emit();
  }

  /**
   * Checks whether the given link is currently the active one.
   * @param linkId - The identifier of the navigation link to check.
   * @returns True if the link is currently active.
   */
  isActive(linkId: string): boolean {
    return this.activeLink === linkId;
  }
}
