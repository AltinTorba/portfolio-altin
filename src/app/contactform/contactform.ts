import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Hiq NgForm
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contactform',
  standalone: true,
  imports: [FormsModule, TranslateModule, RouterLink],
  templateUrl: './contactform.html',
  styleUrl: './contactform.scss'
})
export class Contactform {
  
  constructor(private http: HttpClient) {}

  contactData = {
    name: "",
    email: "",
    message: "",
    checkbox: false,
  }

  nameTouched = {
    name: false,
    email: false,
    message: false
  };

  markAsTouched(field: 'name' | 'email' | 'message') {
    this.nameTouched[field] = true;
  }

  mailTest = false;

  post = {
    endPoint: 'https://altintorba.net/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: { 'Content-Type': 'text/plain' },
      responseType: 'text' as const
    }
  };

  onSubmit(form: any) {
    if (form.submitted && form.valid && !this.mailTest) {
      this.http.post(
        this.post.endPoint,
        this.post.body(this.contactData),
        this.post.options
      ).subscribe({
        next: (response) => {
          form.reset();
          this.contactData = { name: "", email: "", message: "", checkbox: false };
          this.nameTouched = { name: false, email: false, message: false };
          console.log('Email sent successfully!', response);
        },
        error: (error) => {
          console.error('Sending failed:', error);
        }
      });
    } else if (form.submitted && form.valid && this.mailTest) {
      console.info('MailTest enabled – no email sent');
      form.reset();
      this.contactData = { name: "", email: "", message: "", checkbox: false };
      this.nameTouched = { name: false, email: false, message: false };
    }
  }
}