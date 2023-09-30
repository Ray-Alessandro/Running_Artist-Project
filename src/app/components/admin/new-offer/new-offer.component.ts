import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpDataService } from '../../../services/http-data.service';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.component.html',
  styleUrls: ['./new-offer.component.css']
})
export class NewOfferComponent {
  offerCreateForm: FormGroup; // Definición del FormGroup
  id: any;
  newOffer : any;
  
  constructor(private formBuilder: FormBuilder, private api: HttpDataService, private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar) {
    this.offerCreateForm = this.formBuilder.group({
      title: ['',Validators.required], // Valor inicial del campo Title
      description: ['',Validators.required], // Valor inicial del campo Description
      points: ['',[
          Validators.required,
          Validators.pattern(/^[0-9]+$/), ],
      ],
      businessId: ['',[
        Validators.required,
        Validators.pattern(/^[0-9]+$/), ],
    ]
    });
  }

  ngOnInit(){
    this.api.getOffers().subscribe((response: any) => {
      this.id = response.length+1;
      console.log(this.id);
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      panelClass: ['color-snackbar-created'],
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  setInitialValues(){
    this.offerCreateForm.patchValue({
      title: this.newOffer.title,
      description: this.newOffer.description,
      points: this.newOffer.points,
      businessId: this.newOffer.businessId
    });
  }

  onSubmit(){
    if(this.offerCreateForm.valid){
      this.newOffer = this.offerCreateForm.value;
      this.createOffer();
      this.router.navigate(['/offers']);
    }
    else{
      alert("Formulario no válido");
    }
  }

   createOffer(){
    this.newOffer.id = this.id;
    this.api.createOffer(this.newOffer).subscribe(
      (response) => {
        this.openSnackBar('Oferta creada correctamente');
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
