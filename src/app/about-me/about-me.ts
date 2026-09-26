import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about-me',
  imports: [TranslateModule],
  templateUrl: './about-me.html',
  styleUrls: ['./about-me.scss']
})
export class AboutMe implements AfterViewInit, OnDestroy {
  @ViewChild('photoContainer') photoContainer!: ElementRef<HTMLElement>;
  private translate = inject(TranslateService);

  private langChangeSub?: { unsubscribe(): void };
  private onPhotoLoad = () => this.updatePhotoBottom();
  private photoImg?: HTMLImageElement;

  private readonly cvLangs = ['en', 'de', 'sq'];

  ngAfterViewInit(): void {
    this.updatePhotoBottom();

    // Rillogarit pas frame-it të parë, në rast se layout-i ende s'ishte
    // plotësisht i qëndrueshëm kur u kry ngAfterViewInit (p.sh. fonts/AOS).
    requestAnimationFrame(() => this.updatePhotoBottom());

    // Foto (img:nth-child(1)) mund të ngarkohet në mënyrë asinkrone pas
    // ngAfterViewInit. Nëse kjo ndodh, --photo-bottom i llogaritur më parë
    // mbetet i pasaktë përgjithmonë, sepse asnjë resize s'ndodh vetvetiu.
    // Rillogarisim sapo foto të ketë përfunduar së ngarkuari.
    const img = this.photoContainer.nativeElement.querySelector('img');
    if (img instanceof HTMLImageElement) {
      this.photoImg = img;
      if (img.complete) {
        // Tashmë e ngarkuar (p.sh. nga cache) - rillogarit njëherë për siguri.
        this.updatePhotoBottom();
      } else {
        img.addEventListener('load', this.onPhotoLoad);
      }
    }

    this.langChangeSub = this.translate.onLangChange.subscribe(() => {
      setTimeout(() => this.updatePhotoBottom(), 0);
    });
  }

  ngOnDestroy(): void {
    this.langChangeSub?.unsubscribe();
    this.photoImg?.removeEventListener('load', this.onPhotoLoad);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updatePhotoBottom();
  }

  /**
   * Rrugën e CV-së (PDF) sipas gjuhës aktive të faqes. Bie automatikisht
   * mbrapa te anglishtja nëse gjuha aktive nuk ka ende një CV të përkthyer.
   */
  cvHref(): string {
    const current = (this.translate.currentLang || this.translate.defaultLang || 'en').toLowerCase();
    const lang = this.cvLangs.includes(current) ? current : 'en';
    return `./assets/cv/CV_Altin_Torba_${lang.toUpperCase()}.pdf`;
  }

  private updatePhotoBottom(): void {
    const rect = this.photoContainer.nativeElement.getBoundingClientRect();
    const bottomAbsolute = rect.bottom + window.scrollY;
    document.documentElement.style.setProperty('--photo-bottom', `${bottomAbsolute}px`);
  }
}
