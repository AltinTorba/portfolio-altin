import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './portfolio.html',
  styleUrls: ['./portfolio.scss']
})
export class Portfolio {

  projects = [
    {
      image: 'elpolloloco',
      name: 'El Pollo Loco',
      descriptionKey: 'portfolio.projects.elpollo.description',
      tech: ['JavaScript', 'HTML5', 'OOP'],
      github: 'https://github.com/AltinTorba/ElPolloLoco',
      live: 'https://el-pollo-loco.akleinschmidt.net/'
    },
    {
      image: 'join',
      name: 'Join',
      descriptionKey: 'portfolio.projects.join.description',
      tech: ['JavaScript', 'CSS', 'HTML'],
      github: 'https://github.com/AltinTorba/JOIN',
      live: 'https://join.akleinschmidt.net/'
    },
  ];

  references = [
    {
      text: 'Altin ist eine verlässliche Person, mit der ich sehr gerne am Projekt gearbeitet habe...',
      name: 'Dominic Schmid',
      title: 'Team Partner'
    }
  ];
}
