import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Navigation } from './navigation/navigation';

@Component({
  selector: 'app-header',
  imports: [TranslateModule, Navigation],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  overlayOpen = false;

toggleOverlay() {
  this.overlayOpen = !this.overlayOpen;

  if (this.overlayOpen) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }
}

closeOverlay() {
  this.overlayOpen = false;
  document.body.classList.remove('no-scroll');
}


}
