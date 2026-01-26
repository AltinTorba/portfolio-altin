import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './portfolio.html',
  styleUrls: ['./portfolio.scss'],
})
export class Portfolio {
  projects = [
    {
      image: 'elpolloloco',
      name: 'El Pollo Loco',
      descriptionKey: 'portfolio.projects.elpollo.description',
      tech: ['JavaScript', 'HTML5', 'OOP'],
      github: 'https://github.com/AltinTorba/el_pollo_loco',
      live: 'https://el-pollo-loco.altintorba.net/',
    },
    {
      image: 'join',
      name: 'Join',
      descriptionKey: 'portfolio.projects.join.description',
      tech: ['JavaScript', 'CSS', 'HTML'],
      github: 'https://github.com/AltinTorba/JOIN',
      live: 'https://join.altintorba.net/',
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

  prevReference() {
    this.currentReferenceIndex =
      (this.currentReferenceIndex - 1 + this.references.length) % this.references.length;
  }

  nextReference() {
    this.currentReferenceIndex = (this.currentReferenceIndex + 1) % this.references.length;
  }
}
