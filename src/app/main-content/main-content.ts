import { Component } from '@angular/core';
import { AboutMe } from '../about-me/about-me';
import { Skills } from '../skills/skills';
import { Portfolio } from '../portfolio/portfolio';
import { Contactform } from "../contactform/contactform";

@Component({
  selector: 'app-main-content',
  imports: [AboutMe, Skills, Portfolio, Contactform],
  templateUrl: './main-content.html',
  styleUrl: './main-content.scss',
})
export class MainContent {

}
