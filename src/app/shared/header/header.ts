import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { Navigation } from './navigation/navigation';

@Component({
  selector: 'app-header',
  imports: [TranslateModule, Navigation, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  overlayOpen = false;

  /**
   * Toggles the mobile navigation overlay open or closed, locking body
   * scroll while the overlay is open.
   */
  toggleOverlay() {
    if (this.overlayOpen) {
      this.closeOverlay();
    } else {
      this.overlayOpen = true;
      document.body.classList.add('no-scroll');
    }
  }

  /**
   * Closes the mobile navigation overlay and restores body scroll.
   */
  closeOverlay() {
    this.overlayOpen = false;
    document.body.classList.remove('no-scroll');
  }
}
