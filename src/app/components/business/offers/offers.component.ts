import { Component, OnInit, ViewChild } from '@angular/core';
import { Offer } from 'src/app/models/offer.model';

import { MatSort } from '@angular/material/sort';
import { NgForm }  from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogModule,MatDialogRef} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HttpDataService } from 'src/app/services/http-data.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent {
  offerData!: Offer;

  @ViewChild('movieForm', { static: false })
  offerForm!: NgForm;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'points',
    'businessId',
    'actions',
  ];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  movieDeleted = false;

  
  @ViewChild(MatSort, { static: true }) Sort!: MatSort;


  constructor(private httpDataService: HttpDataService , public dialog: MatDialog, private _snackBar: MatSnackBar) {
    this.offerData= {} as Offer;
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.Sort;
    this.getAllMovies();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Cerrar", {
      panelClass: ['color-snackbar-deleted'],
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  getAllMovies() {
    this.httpDataService.getOffers().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //delete
  deleteMovie(id: string){
    this.httpDataService.deleteOffer(id).subscribe((response: any)=>{
      this.dataSource.data = this.dataSource.data.filter((o: any)=>{
        this.getAllMovies();
        this.openSnackBar("Pelicula Eliminada");
        return o.id !== id ? o : false;
      })
    })
    console.log(this.dataSource.data);
  }


  //Ventana Modal

  openDialogDelete(movie_id : string) {
    const dialogRef = this.dialog.open(DialogDeleteOffer, {
      data: { nombre :  this.movieDeleted},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.movieDeleted = result;
      if(this.movieDeleted){
        this.deleteMovie(movie_id);
      }
    });
  }


}

@Component({
  selector: 'dialog-delete-user',
  templateUrl: './dialogs/dialog-delete-offer.html',
  styleUrls: ['./dialogs/dialog-delete-offer.css'],
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatDialogModule],
})
export class DialogDeleteOffer {
  constructor(public dialogRef: MatDialogRef<DialogDeleteOffer>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
