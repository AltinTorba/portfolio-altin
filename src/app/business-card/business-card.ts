import { Component, EventEmitter, Output, HostListener, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-business-card',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './business-card.html',
  styleUrls: ['./business-card.scss'],
})
export class BusinessCard {
  @Output() closeCard = new EventEmitter<void>();
  private translate = inject(TranslateService);

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeCard.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeCard.emit();
    }
  }

  /**
   * Ndërton tekstin vCard (i njëjtë për shkarkim dhe për kodin QR), në
   * gjuhën aktive për titullin e rolit.
   */
  private buildVCard(): string {
    const roleTitle = this.translate.instant('atf.role');
    const lines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Torba;Altin;;;',
      'FN:Altin Torba',
      `TITLE:${roleTitle}`,
      'TEL;TYPE=CELL:+491578403278',
      'EMAIL:altin@altintorba.de',
      'URL:https://altintorba.de',
      'ADR;TYPE=WORK:;;Siegen;;;;Germany',
      'END:VCARD',
    ];
    return lines.join('\r\n');
  }

  /**
   * Gjeneron dhe shkarkon një kartë kontakti (.vcf) me të dhënat aktuale.
   */
  downloadVCard(): void {
    const vcard = this.buildVCard();
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Altin-Torba.vcf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * URL e imazhit të kodit QR (shërbim publik falas, pa çelës API) që kodon
   * të njëjtin vCard — skanuar me kamerën e telefonit, hap direkt "Shto
   * kontakt", pa kërkuar transferim skedari nga desktop-i.
   */
  qrCodeUrl(): string {
    const data = encodeURIComponent(this.buildVCard());
    return `https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=8&data=${data}`;
  }
}
