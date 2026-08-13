import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

interface Project {
  image: string;
  name: string;
  descriptionKey: string;
  tech: string[];
  github: string;
  live: string;
  team?: number;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './portfolio.html',
  styleUrls: ['./portfolio.scss'],
})
export class Portfolio {
  projects: Project[] = [
    {
      image: 'pokedex',
      name: 'Pokedex',
      descriptionKey: 'portfolio.projects.pokedex.description',
      tech: ['JavaScript', 'HTML5', 'REST API'],
      github: 'https://github.com/AltinTorba/mein_pokedex_projekt',
      live: 'https://altintorba.github.io/mein_pokedex_projekt/',
    },
    {
      image: 'elpolloloco',
      name: 'El Pollo Loco',
      descriptionKey: 'portfolio.projects.elpollo.description',
      tech: ['JavaScript', 'HTML5', 'OOP'],
      github: 'https://github.com/AltinTorba/el_pollo_loco',
      live: 'https://altintorba.github.io/el_pollo_loco/',
    },
    {
      image: 'join',
      name: 'Join',
      descriptionKey: 'portfolio.projects.join.description',
      tech: ['HTML', 'CSS', 'TypeScript', 'Angular', 'Firebase'],
      team: 4,
      github: 'https://github.com/AltinTorba/join-app',
      live: 'https://altintorba.github.io/join-app/',
    },
    {
      image: 'kanmind',
      name: 'KanMind',
      descriptionKey: 'portfolio.projects.kanmind.description',
      tech: ['Python', 'Django REST Framework', 'REST API'],
      github: 'https://github.com/AltinTorba/KanMind',
      live: 'https://kanmind-altin.duckdns.org/pages/auth/login.html',
    },
    {
      image: 'coderr',
      name: 'Coderr',
      descriptionKey: 'portfolio.projects.coderr.description',
      tech: ['Python', 'Django REST Framework', 'SQLite'],
      github: 'https://github.com/AltinTorba/coderr_backend',
      live: 'https://altintorba-coderr.duckdns.org/index.html',
    },
    {
      image: 'quizly',
      name: 'Quizly',
      descriptionKey: 'portfolio.projects.quizly.description',
      tech: ['Python', 'Django', 'DRF'],
      github: 'https://github.com/AltinTorba/quizly-backend',
      live: '',
    },
    {
      image: 'videoflix',
      name: 'Videoflix',
      descriptionKey: 'portfolio.projects.videoflix.description',
      tech: ['Python', 'Django REST Framework', 'HLS'],
      github: 'https://github.com/AltinTorba/videoflix-backend',
      live: '',
    },
    {
      image: 'portfolio',
      name: 'Portfolio',
      descriptionKey: 'portfolio.projects.portfolioProject.description',
      tech: ['Angular', 'TypeScript', 'SCSS'],
      github: 'https://github.com/AltinTorba/portfolio-altin',
      live: 'https://altintorba.github.io/portfolio-altin/',
    },
  ];

  references = [
    {
      textKey: 'portfolio.references.reference1.text',
      name: 'Dominic Schmid',
      titleKey: 'portfolio.references.reference1.title',
    },
    {
      textKey: 'portfolio.references.reference2.text',
      name: 'Anna Müller',
      titleKey: 'portfolio.references.reference2.title',
    },
    {
      textKey: 'portfolio.references.reference3.text',
      name: 'Max Becker',
      titleKey: 'portfolio.references.reference3.title',
    },
  ];

  currentReferenceIndex = 0;

  /**
   * Moves to the previous testimonial in the references carousel,
   * wrapping around to the last one if currently at the first.
   */
  prevReference() {
    this.currentReferenceIndex =
      (this.currentReferenceIndex - 1 + this.references.length) % this.references.length;
  }

  /**
   * Moves to the next testimonial in the references carousel,
   * wrapping around to the first one if currently at the last.
   */
  nextReference() {
    this.currentReferenceIndex = (this.currentReferenceIndex + 1) % this.references.length;
  }
}
