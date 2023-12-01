import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from 'src/app/service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  
  constructor(private homeService: HomeService) {
    homeService.getAllBooks();
  }
}
