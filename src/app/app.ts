import { Component, AfterViewInit } from '@angular/core';
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
  constructor(
    private translate: TranslateService,
    private router: Router
  ) {
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
        const hasHash = this.router.url.includes('#');
        if (!hasHash) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    });
  }


}
