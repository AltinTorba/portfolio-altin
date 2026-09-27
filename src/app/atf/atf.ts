import { Component, AfterViewInit, HostListener } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { positionEdgeLine } from '../shared/edge-line';

@Component({
  selector: 'app-atf',
  imports: [TranslateModule, RouterLink],
  templateUrl: './atf.html',
  styleUrl: './atf.scss',
})
export class Atf implements AfterViewInit {
  ngAfterViewInit(): void {
    this.updateSocialsLine();
    setTimeout(() => this.updateSocialsLine(), 800);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateSocialsLine();
  }

  private updateSocialsLine(): void {
    positionEdgeLine({
      line: document.querySelector('app-atf .socials .line'),
      anchor: document.querySelector('app-atf .socials .icons a:first-child'),
      ancestor: document.querySelector('app-atf .socials'),
      direction: 'left',
      gap: 42,
    });
  }
}
