import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

interface CertSection {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
}

interface CertificateModalData {
  key: string;
  title: string;
  issuer: string;
  transcriptPdf?: string;
}

@Component({
  selector: 'app-cert-read-modal',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './cert-read-modal.html',
  styleUrls: ['./cert-read-modal.scss'],
})
export class CertReadModal {
  @Input({ required: true }) certificate!: CertificateModalData;
  @Input() sections: CertSection[] = [];
  @Output() closeModal = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeModal.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeModal.emit();
    }
  }
}
