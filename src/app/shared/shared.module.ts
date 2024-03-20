import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonDeleteModalComponent } from './common-delete-modal/common-delete-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        MatIconModule,
        MatTooltipModule,
        MatButtonModule,
        MatSnackBarModule,
        MatSortModule,
        MatFormFieldModule,
        MatDialogModule,
        MatSlideToggleModule,
        MatSelectModule,
        MonacoEditorModule,

    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        MatIconModule,
        MatTooltipModule,
        MatButtonModule,
        MatSnackBarModule,
        MatSortModule,
        MatFormFieldModule,
        MatDialogModule,
        MatSlideToggleModule,
        MatSelectModule,
        MonacoEditorModule,

    ],
    declarations: [CommonDeleteModalComponent],
})
export class SharedModule {}
