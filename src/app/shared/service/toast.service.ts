import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    constructor(
        private matSnackBar: MatSnackBar
    ) {}

    // show toast message
    showToastMessage(message: string, cssClassName: string): void {
        this.matSnackBar.open(message, 'close', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: cssClassName
        });
    }
};
