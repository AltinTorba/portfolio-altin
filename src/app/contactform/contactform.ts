import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Hiq NgForm
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contactform',
  standalone: true,
  imports: [ FormsModule, TranslateModule, RouterLink ],
  templateUrl: './contactform.html',
  styleUrl: './contactform.scss'
})
export class Contactform {

  constructor (private http: HttpClient) { }

  contactData = {
    name: "",
    email: "",
    message: "",
    checkbox: false,
    company: ""
  };

  nameTouched = {
    name: false,
    email: false,
    message: false
  };

  markAsTouched(field: 'name' | 'email' | 'message') {
    this.nameTouched[ field ] = true;
  }

  mailTest = false;

  post = {
    endPoint: 'https://jetaever8.de/wp-json/contact/v1/send',
  };

  onSubmit(form: any) {
    if (form.valid && !this.mailTest) {
      this.http.post(this.post.endPoint, this.contactData).subscribe({
        next: () => {
          form.reset();
          this.contactData = {
            name: '',
            email: '',
            message: '',
            checkbox: false,
            company: ""
          };
          this.nameTouched = {
            name: false,
            email: false,
            message: false
          };
          console.log('Email sent successfully');
        },
        error: (err) => {
          console.error('Sending failed:', err);
        }
      });
    }
  }

}