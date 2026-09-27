import { Component, signal, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CertReadModal } from '../cert-read-modal/cert-read-modal';

interface CertSection {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
}

interface Certificate {
  key: string;
  image: string;
  title: string;
  issuer: string;
  date: string;
  pdf: string;
  certNumber?: string;
  badges?: { image: string; alt: string }[];
  transcriptPdf?: string;
}

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [TranslateModule, CertReadModal],
  templateUrl: './certifications.html',
  styleUrls: ['./certifications.scss'],
})
export class Certifications {
  private translate = inject(TranslateService);

  activeCert = signal<Certificate | null>(null);
  activeSections = signal<CertSection[]>([]);

  private readonly cvLangs = ['en', 'de', 'sq'];
  showCvDownload = false;

  toggleCvDownload(): void {
    this.showCvDownload = !this.showCvDownload;
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

  constructor() {
    this.translate.onLangChange.subscribe(() => {
      if (this.activeCert()) {
        this.updateActiveSections();
      }
    });
  }

  openReadModal(cert: Certificate): void {
    this.activeCert.set(cert);
    this.updateActiveSections();
  }

  closeReadModal(): void {
    this.activeCert.set(null);
  }

  private updateActiveSections(): void {
    const cert = this.activeCert();
    if (!cert) {
      this.activeSections.set([]);
      return;
    }
    const sections = this.translate.instant(`certifications.certificates.${cert.key}.sections`);
    this.activeSections.set(Array.isArray(sections) ? sections : []);
  }

  certificates: Certificate[] = [
    {
      key: 'backend',
      image: 'cert-backend',
      title: 'Back-End Development',
      issuer: 'Developer Akademie',
      date: 'August 2026',
      pdf: './assets/certs/altintorba-certificate-backend.pdf',
      certNumber: '15310966885224',
      badges: [{ image: 'badge-tuv-azav', alt: 'TÜV Saarland – AZAV accredited' }],
      transcriptPdf: './assets/certs/altintorba-transcript-backend.pdf',
    },
    {
      key: 'frontend',
      image: 'cert-frontend',
      title: 'Front-End Web Development',
      issuer: 'Developer Akademie',
      date: 'September 2026',
      pdf: './assets/certs/altintorba-certificate-frontend.pdf',
      certNumber: '98766085125481',
      badges: [{ image: 'badge-tuv-azav', alt: 'TÜV Saarland – AZAV accredited' }],
      transcriptPdf: './assets/certs/altintorba-transcript-frontend.pdf',
    },
    {
      key: 'python',
      image: 'cert-python',
      title: 'ICT & Digital Skills Training on Python Programming',
      issuer: 'Republic of Kosovo, Ministry of Economy (EU-funded)',
      date: 'July 2023',
      pdf: './assets/certs/altintorba-certificate-python.pdf',
      badges: [
        { image: 'badge-eu', alt: 'Funded by the European Union' },
        { image: 'badge-kosovo', alt: 'Republic of Kosovo' },
      ],
    },
  ];
}
