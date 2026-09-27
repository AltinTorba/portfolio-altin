import { Component, AfterViewInit, OnDestroy, HostListener, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import emailjs from '@emailjs/browser';
import { BusinessCard } from '../business-card/business-card';
import { positionEdgeLine, observeAosReveal } from '../shared/edge-line';

@Component({
  selector: 'app-contactform',
  standalone: true,
  imports: [ FormsModule, TranslateModule, RouterLink, BusinessCard ],
  templateUrl: './contactform.html',
  styleUrl: './contactform.scss'
})
export class Contactform implements AfterViewInit, OnDestroy {
  private translate = inject(TranslateService);
  private unsubscribeAosHeadline?: () => void;
  private unsubscribeAosText?: () => void;

  ngAfterViewInit(): void {
    this.updateHeadlineLines();
    this.translate.onLangChange.subscribe(() => this.updateHeadlineLines());
    setTimeout(() => this.updateHeadlineLines(), 800);
    // Dy prinda te ndryshem me `data-aos` (.headline dhe .text) - te dy
    // mund te zhvendosin vijen e vet PAS llogaritjes fillestare.
    this.unsubscribeAosHeadline = observeAosReveal(
      document.querySelector('app-contactform .headline'),
      () => this.updateHeadlineLines()
    );
    this.unsubscribeAosText = observeAosReveal(
      document.querySelector('app-contactform .text'),
      () => this.updateHeadlineLines()
    );
  }

  ngOnDestroy(): void {
    this.unsubscribeAosHeadline?.();
    this.unsubscribeAosText?.();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateHeadlineLines();
  }

  private updateHeadlineLines(): void {
    this.updateMainHeadlineLine();
    this.updateProblemHeadlineLine();
  }

  private updateMainHeadlineLine(): void {
    positionEdgeLine({
      line: document.querySelector('app-contactform .headline > .line'),
      anchor: document.querySelector('app-contactform .headline h1'),
      ancestor: document.querySelector('app-contactform .headline'),
      direction: 'right',
      gap: 24,
    });
  }

  /**
   * "Got a problem to solve?" - njesoj si titujt h1 (Certifications/
   * Portfolio): vize e shkurter ngjitur majtas tekstit, qendruar vertikalisht
   * ne mes te h2-s. Nen 480px h2 eshte shume afer skajit te majte - gap:24
   * s'le fare hapesire per vijen te duket, prandaj gap me i vogel ne mobile.
   */
  private updateProblemHeadlineLine(): void {
    positionEdgeLine({
      line: document.querySelector('app-contactform .text-headline .line'),
      anchor: document.querySelector('app-contactform .text-headline h2'),
      ancestor: document.querySelector('app-contactform .text-headline'),
      direction: 'left',
      gap: window.innerWidth <= 480 ? 8 : 24,
    });
  }

  contactData = {
    name: '',
    email: '',
    message: '',
    checkbox: false,
    company: ''
  };

  nameTouched = {
    name: false,
    email: false,
    message: false
  };

  showBusinessCard = false;

  /**
   * Marks a form field as touched, triggering validation display on blur.
   * @param field - The name of the field to mark as touched ('name', 'email', or 'message').
   */
  markAsTouched(field: 'name' | 'email' | 'message') {
    this.nameTouched[ field ] = true;
  }

  mailTest = false;

  submitStatus: 'idle' | 'success' | 'error' = 'idle';

  isSubmitting = false;

  emailjsConfig = {
    serviceId: 'service_90qxwae',
    templateId: 'template_tluall3',
    publicKey: 'hK94NwwkXIftab1dj',
  };

  /**
   * Handles contact form submission. Sends the message via EmailJS if the form
   * is valid and no submission is currently in progress.
   * @param form - The Angular NgForm instance representing the contact form.
   */
  onSubmit(form: NgForm) {
    if (!form.valid || this.mailTest || this.isSubmitting) {
      return;
    }
    this.isSubmitting = true;
    const templateParams = this.buildTemplateParams();
    emailjs
      .send(
        this.emailjsConfig.serviceId,
        this.emailjsConfig.templateId,
        templateParams,
        this.emailjsConfig.publicKey
      )
      .then(
        () => this.handleSubmitSuccess(form),
        (error) => this.handleSubmitError(error)
      );
  }

  /**
   * Builds the parameter object sent to the EmailJS template from the current form data.
   */
  private buildTemplateParams() {
    return {
      name: this.contactData.name,
      email: this.contactData.email,
      message: this.contactData.message,
    };
  }

  /**
   * Resets form state and marks the submission as successful.
   * @param form - The Angular NgForm instance to reset.
   */
  private handleSubmitSuccess(form: NgForm) {
    this.submitStatus = 'success';
    this.isSubmitting = false;
    form.reset();
    this.contactData = { name: '', email: '', message: '', checkbox: false, company: '' };
    this.nameTouched = { name: false, email: false, message: false };
  }

  /**
   * Logs the EmailJS error and marks the submission as failed.
   * @param error - The error returned by the EmailJS send call.
   */
  private handleSubmitError(error: unknown) {
    console.error('EmailJS error:', error);
    this.submitStatus = 'error';
    this.isSubmitting = false;
  }
}
