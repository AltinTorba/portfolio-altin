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

  ngAfterViewInit(): void {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
      mirror: true,
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const hashIndex = this.router.url.indexOf('#');
        if (hashIndex === -1) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const fragment = this.router.url.substring(hashIndex + 1);
          setTimeout(() => {
            const target = document.getElementById(fragment);
            if (target) {
              const offsets: Record<string, number> = {
                'skills': 140,
                'about-me': 60,
                'portfolio': 98,
                'contact': 60,
                'above-the-fold': 0,
              };
              const headerOffset = offsets[fragment] ?? 100;
              const elementPosition = target.getBoundingClientRect().top + window.scrollY;
              window.scrollTo({ top: elementPosition - headerOffset, behavior: 'smooth' });
            }
          }, 0);
        }
      }
    });
  }


}
