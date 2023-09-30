import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpDataService } from '../../../services/http-data.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.css']
})

export class EditOfferComponent {
  offerEditForm: FormGroup; // Definición del FormGroup
  id: any;
  newOffer : any;
  
  constructor(private formBuilder: FormBuilder, private api: HttpDataService, private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar) {
    this.offerEditForm = this.formBuilder.group({
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
    this.id = this.route.snapshot.paramMap.get('id');
    this.api.getOffer(this.id).subscribe((response: any)=>{
      console.log(response);
      this.newOffer = response;
      this.setInitialValues();
    })
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      panelClass: ['color-snackbar-updated'],
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  setInitialValues(){
    this.offerEditForm.patchValue({
      title: this.newOffer.title,
      description: this.newOffer.description,
      points: this.newOffer.points,
      businessId: this.newOffer.businessId
    });
  }

  onSubmit(){
    if(this.offerEditForm.valid){
      this.newOffer = this.offerEditForm.value;
      this.updateOffer();
      this.router.navigate(['/offers']);
    }
    else{
      alert("Formulario no válido");
    }
  }

  updateOffer(){
    this.api.updateOffer(this.id, this.newOffer).subscribe((response: any)=>{
      this.openSnackBar("Offer updated successfully");
    })
  }

}


