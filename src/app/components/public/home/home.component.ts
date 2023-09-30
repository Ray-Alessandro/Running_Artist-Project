import { Component } from '@angular/core';
import { HttpDataService } from 'src/app/services/http-data.service';
import { Offer } from 'src/app/models/offer.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  Offers: any;

  constructor(private httpDataService: HttpDataService) {
    this.Offers = {} as Offer; 
  }

  ngOnInit() {
    //Se ejecuta cuando se inicia el componente
    this.httpDataService.getOffers().subscribe((response: any) => {
      this.Offers = response; //obtiene todas las offer
      console.log(this.Offers); //this.OfferCount.length;
    });
  }
}
