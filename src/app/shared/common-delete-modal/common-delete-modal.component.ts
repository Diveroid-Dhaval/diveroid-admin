import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-common-delete-modal',
    templateUrl: './common-delete-modal.component.html',
    styleUrls: ['./common-delete-modal.component.scss'],
})
export class CommonDeleteModalComponent implements OnInit {
    title: string;
    message: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<any>
    ) {
        this.title = data.title;
        this.message = data.message;
    }

    ngOnInit(): void {}

    onConfirmClick(): void {
        this.dialogRef.close(true);
    }
}
