import { Component, AfterViewInit, HostListener } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { positionEdgeLine } from '../shared/edge-line';

interface Project {
  image: string;
  name: string;
  descriptionKey: string;
  tech: string[];
  github: string;
  live: string;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './portfolio.html',
  styleUrls: ['./portfolio.scss'],
})
export class Portfolio implements AfterViewInit {
  ngAfterViewInit(): void {
    this.updateHeadlineLine();
    setTimeout(() => this.updateHeadlineLine(), 800);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateHeadlineLine();
  }

  private updateHeadlineLine(): void {
    positionEdgeLine({
      line: document.querySelector('app-portfolio .headline .line'),
      anchor: document.querySelector('app-portfolio .headline h1'),
      ancestor: document.querySelector('app-portfolio .headline'),
      direction: 'left',
      gap: 32,
    });
    this.updateRefLine();
  }

  private updateRefLine(): void {
    positionEdgeLine({
      line: document.querySelector('app-portfolio .ref-line'),
      anchor: document.querySelector('app-portfolio .ref-photo'),
      ancestor: document.querySelector('app-portfolio .ref-row'),
      direction: 'right',
      gap: 0,
    });
  }

  projects: Project[] = [
    {
      image: 'join',
      name: 'Join',
      descriptionKey: 'portfolio.projects.join.description',
      tech: ['HTML', 'CSS', 'TypeScript', 'Angular', 'Firebase'],
      github: 'https://github.com/AltinTorba/join-app',
      live: 'https://join.altintorba.de',
    },
    {
      image: 'elpolloloco',
      name: 'El Pollo Loco',
      descriptionKey: 'portfolio.projects.elpollo.description',
      tech: ['JavaScript', 'HTML5', 'OOP'],
      github: 'https://github.com/AltinTorba/el_pollo_loco',
      live: 'https://el-pollo-loco.altintorba.de',
    },
    {
      image: 'kanmind',
      name: 'KanMind',
      descriptionKey: 'portfolio.projects.kanmind.description',
      tech: ['Python', 'Django REST Framework', 'REST API'],
      github: 'https://github.com/AltinTorba/KanMind',
      live: 'https://kanmind.altintorba.de',
    },
    {
      image: 'coderr',
      name: 'Coderr',
      descriptionKey: 'portfolio.projects.coderr.description',
      tech: ['Python', 'Django REST Framework', 'SQLite'],
      github: 'https://github.com/AltinTorba/coderr_backend',
      live: 'https://coderr.altintorba.de',
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
  ];

  references = [
    {
      textKey: 'portfolio.references.reference2.text',
      name: 'Philipp Biebert',
      titleKey: 'portfolio.references.reference2.title',
      photo: 'philipp-biebert',
    },
    {
      textKey: 'portfolio.references.reference3.text',
      name: 'Frank Meckel',
      titleKey: 'portfolio.references.reference3.title',
      photo: 'frank-meckel',
    },
    {
      textKey: 'portfolio.references.reference1.text',
      name: 'Refiye Külhanbey',
      titleKey: 'portfolio.references.reference1.title',
      photo: 'refiye-kulhanbey',
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
