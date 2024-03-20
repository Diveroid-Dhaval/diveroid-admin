import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class LoaderService {
    // A BehaviourSubject is an Observable with a default value
    isLoading$: boolean = false;

    constructor() { }

    /**
     * Show the loading bar
     */
    showLoader(): void {
        this.isLoading$ = true;
        localStorage.setItem('loader','true');
    }

    /**
     * Hide the loading bar
     */
    hideLoader(): void {
        this.isLoading$ = false;
        localStorage.setItem('loader','false');
    }
};
