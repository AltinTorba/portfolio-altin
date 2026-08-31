import { Component, ElementRef, ViewChild, AfterViewInit, HostListener, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about-me',
  imports: [TranslateModule],
  templateUrl: './about-me.html',
  styleUrls: ['./about-me.scss']
})
export class AboutMe implements AfterViewInit {
  @ViewChild('photoContainer') photoContainer!: ElementRef<HTMLElement>;
  private translate = inject(TranslateService);

  ngAfterViewInit(): void {
    this.updatePhotoBottom();
    this.translate.onLangChange.subscribe(() => {
      setTimeout(() => this.updatePhotoBottom(), 0);
    });
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updatePhotoBottom();
  }

  private updatePhotoBottom(): void {
    const rect = this.photoContainer.nativeElement.getBoundingClientRect();
    const bottomAbsolute = rect.bottom + window.scrollY;
    document.documentElement.style.setProperty('--photo-bottom', `${bottomAbsolute}px`);
  }
}