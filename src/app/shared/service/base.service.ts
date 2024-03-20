import {
    HttpClient,
    HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
const API_URL = '/api/';

@Injectable({
    providedIn: 'root',
})
export class BaseService {
    constructor(public http: HttpClient, private spinner: NgxSpinnerService) {}

    //  customize the error handling here
    private handleError(error: HttpErrorResponse) {
        return throwError(
            error.error.message ? error.error.message : error.message
        );
    }

    // Variable and constructor declaration ends
    get(url: string, data?: any): Observable<any> {
        this.spinner.show();
        return this.http.get(`${API_URL}${url}`, { params: data }).pipe(
            catchError(this.handleError),
            finalize(() => {
                // Hide the spinner when the request is complete (success or error)
                this.spinner.hide();
            })
        );
    }
    post(url: string, data: any): Observable<any> {
        this.spinner.show();
        return this.http
            .post(`${API_URL}${url}`, data)
            .pipe(catchError(this.handleError),
            finalize(() => {
                // Hide the spinner when the request is complete (success or error)
                this.spinner.hide();
            }));
    }
    put(url: string, data: any): Observable<any> {
        this.spinner.show();
        return this.http
            .put(`${API_URL}${url}`, data)
            .pipe(catchError(this.handleError),
            finalize(() => {
                // Hide the spinner when the request is complete (success or error)
                this.spinner.hide();
            }));
    }
    delete(url: string): Observable<any> {
        this.spinner.show();
        return this.http
            .delete(`${API_URL}${url}`)
            .pipe(catchError(this.handleError),
            finalize(() => {
                // Hide the spinner when the request is complete (success or error)
                this.spinner.hide();
            }));
    }
}
