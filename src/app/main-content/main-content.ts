import { Component } from '@angular/core';
import { AboutMe } from '../about-me/about-me';
import { Skills } from '../skills/skills';
import { Certifications } from '../certifications/certifications';
import { Portfolio } from '../portfolio/portfolio';
import { Contactform } from '../contactform/contactform';
import { Atf } from '../atf/atf';
import { TransitionImage } from '../transition-image/transition-image';

@Component({
  selector: 'app-main-content',
  imports: [AboutMe, Skills, Certifications, Portfolio, Contactform, Atf, TransitionImage],
  templateUrl: './main-content.html',
  styleUrl: './main-content.scss',
})
export class MainContent {

}
