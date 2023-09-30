import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
    declarations: [],
    imports: [
      CommonModule
    ],
    exports: [
      MatToolbarModule,
      MatIconModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatTableModule,
      MatPaginatorModule,
      MatCardModule,
      MatGridListModule,
      MatSortModule,
      FormsModule,
      ReactiveFormsModule,
      MatDialogModule,
      MatSnackBarModule
    ]
  })
  export class MaterialModule { }
  