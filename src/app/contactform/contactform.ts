import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contactform',
  standalone: true,
  imports: [ FormsModule, TranslateModule, RouterLink ],
  templateUrl: './contactform.html',
  styleUrl: './contactform.scss'
})
export class Contactform {

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
   * is valid and no submission is currently in progress. Updates submitStatus
   * and resets the form on success.
   * @param form - The Angular NgForm instance representing the contact form.
   */
  onSubmit(form: NgForm) {
    if (form.valid && !this.mailTest && !this.isSubmitting) {
      this.isSubmitting = true;

      const templateParams = {
        name: this.contactData.name,
        email: this.contactData.email,
        message: this.contactData.message,
      };

      emailjs.send(
        this.emailjsConfig.serviceId,
        this.emailjsConfig.templateId,
        templateParams,
        this.emailjsConfig.publicKey
      ).then(
        () => {
          this.submitStatus = 'success';
          this.isSubmitting = false;

          form.reset();
          this.contactData = {
            name: '',
            email: '',
            message: '',
            checkbox: false,
            company: ''
          };
          this.nameTouched = {
            name: false,
            email: false,
            message: false
          };
        },
        (error) => {
          console.error('EmailJS error:', error);
          this.submitStatus = 'error';
          this.isSubmitting = false;
        }
      );
    }
  }

}