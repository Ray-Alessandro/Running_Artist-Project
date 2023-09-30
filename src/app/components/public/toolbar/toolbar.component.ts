import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  constructor(private router: Router) { }

  pageHome(){
    this.router.navigate(['/home']);
  }

  pageOffers(){
    this.router.navigate(['/offers']);
  }

}
