import { Component, AfterViewInit, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import AOS from 'aos';
import 'aos/dist/aos.css';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, TranslateModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements AfterViewInit {
  private translate = inject(TranslateService);
  private router = inject(Router);

  constructor() {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  private readonly sectionOffsets: Record<string, number> = {
    'skills': 140,
    'about-me': 60,
    'portfolio': 98,
    'contact': 60,
    'above-the-fold': 0,
  };

  /**
   * Initializes AOS animations and sets up scroll behavior on route changes.
   */
  ngAfterViewInit(): void {
    this.initAnimations();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.handleRouteScroll();
      }
    });
  }

  /**
   * Initializes the AOS (Animate On Scroll) library with the app's animation settings.
   */
  private initAnimations(): void {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
      mirror: true,
    });
  }

  /**
   * Scrolls to the top of the page, or to a specific section if the current
   * route contains a fragment (e.g. #about-me).
   */
  private handleRouteScroll(): void {
    const hashIndex = this.router.url.indexOf('#');
    if (hashIndex === -1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const fragment = this.router.url.substring(hashIndex + 1);
    setTimeout(() => this.scrollToFragment(fragment), 0);
  }

  /**
   * Scrolls smoothly to the element matching the given fragment id,
   * offsetting for the fixed header height of that section.
   * @param fragment - The id of the target section (from the URL hash).
   */
  private scrollToFragment(fragment: string): void {
    const target = document.getElementById(fragment);
    if (!target) {
      return;
    }
    const headerOffset = this.sectionOffsets[fragment] ?? 100;
    const elementPosition = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: elementPosition - headerOffset, behavior: 'smooth' });
  }


}
