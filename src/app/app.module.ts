import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/public/footer/footer.component';
import { ToolbarComponent } from './components/public/toolbar/toolbar.component';
import { HomeComponent } from './components/public/home/home.component';
import { OffersComponent } from './components/business/offers/offers.component';
import { NewOfferComponent } from './components/admin/new-offer/new-offer.component';
import { EditOfferComponent } from './components/admin/edit-offer/edit-offer.component';

import { MaterialModule } from './components/public/shared/material.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ToolbarComponent,
    HomeComponent,
    OffersComponent,
    NewOfferComponent,
    EditOfferComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
