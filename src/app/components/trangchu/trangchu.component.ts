import { ViewEncapsulation } from '@angular/core';
import { Component } from '@angular/core';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

@Component({
  selector: 'app-trangchu',
  templateUrl: './trangchu.component.html',
//   styleUrls: ['./trangchu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TrangchuComponent {
  
}
