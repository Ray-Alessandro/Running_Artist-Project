import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/public/home/home.component';
import { OffersComponent } from './components/business/offers/offers.component';
import { NewOfferComponent } from './components/admin/new-offer/new-offer.component';
import { EditOfferComponent } from './components/admin/edit-offer/edit-offer.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'offers', component: OffersComponent},
  {path: 'admin/offers/new', component: NewOfferComponent},
  {path: 'admin/offers/edit/:id', component: EditOfferComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', redirectTo: 'home' } 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
