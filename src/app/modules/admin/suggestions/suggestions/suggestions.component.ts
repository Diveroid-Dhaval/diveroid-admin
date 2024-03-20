import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonDeleteModalComponent } from 'app/shared/common-delete-modal/common-delete-modal.component';
import { Apiurl } from 'app/shared/route';
import { BaseService } from 'app/shared/service/base.service';
import { LoaderService } from 'app/shared/service/loader.service';
import { ToastService } from 'app/shared/service/toast.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-suggestions',
    templateUrl: './suggestions.component.html',
    styleUrls: ['./suggestions.component.scss'],
})
export class SuggestionsComponent implements OnInit {
    @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
    @ViewChild('filter', { static: false }) filter: any;
    dataSource: MatTableDataSource<any> = new MatTableDataSource();
    columns: Array<string>;
    totalRows: number = 0;
    pageIndex: number = 0;
    pageSizeOptions: number[] = [5, 10, 25, 100];
    pageSize: number = 5;
    sortDirection: string = '';
    sortColumn: string = '';
    searchText: FormControl;
    searchUpdater = new Subject<string>();
    suggestionmedia: any = [];
    constructor(
        private baseService: BaseService,
        private toastService: ToastService,
        public dialog: MatDialog,
        private loader: LoaderService,
        private sanitizer: DomSanitizer
    ) {
        this.searchUpdater
            .pipe(debounceTime(1000), distinctUntilChanged())
            .subscribe(() => this.getSuggestionList());
    }

    ngOnInit(): void {
        this.searchText = new FormControl('');
        this.dataInitializer();
    }

    /**
     * Method to initialize data
     */
    private dataInitializer(): void {
        this.initColumns();
        this.getSuggestionList();
    }

    /**
     * Method to get and set all data to data source     */
    private getSuggestionList(): void {
        this.loader.showLoader();

        const params = {
            index: this.pageIndex + 1,
            size: this.pageSize,
        };
        if (this.searchText?.value) {
            params['searchText'] = this.searchText.value;
        }
        if (this.sortDirection !== '' && this.sortColumn !== '') {
            params['sortDirection'] = this.sortDirection;
            params['sortOption'] = this.sortColumn;
        }

        this.baseService
            .get(Apiurl.suggestionsList, params)
            .subscribe((response: any) => {
                this.loader.hideLoader();
                if (response) {
                    this.dataSource.data = response.data.Suggestion;
                    this.totalRows = response.data.totalRecords;
                    setTimeout(() => {
                        this.paginator.pageIndex = this.pageIndex;
                        this.paginator.length = response.data.totalRecords;
                    });
                } else {
                    this.toastService.showToastMessage(
                        response.message,
                        'error-style'
                    );
                }
            },
            (error) => {
                // Handle errors
                this.dataSource.data = [];
                this.paginator.length = 0;
                if (this.pageIndex !== 0) {
                    this.pageIndex = 0;
                    this.getSuggestionList();
                }
                // this.toastService.showToastMessage(error, 'error-style');
            }
        );
    }

    /**
     * Method to initialize Columns field
     */
    private initColumns(): void {
        this.columns = [
            'id',
            'Title',
            'Content',
            'Type',
            'Name',
            'suggestionmedia',
            'action',
        ];
    }

    /*---------------------------------
Public methods
-----------------------------------*/

    /**
     * input method for search the data
     * @param event set the event
     */
    onSerach(event) {
        this.searchText.setValue(event.target.value);
        this.searchUpdater.next(this.filter.nativeElement.value);
    }
    /**
     * method for cancel searching
     */
    cancelSearch() {
        this.searchText.setValue('');
        this.searchUpdater.next(this.filter.nativeElement.value);
    }
    /**
     * method for get data when page size is chnage
     * @param event
     */

    pageChanged(event: PageEvent): void {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
        this.getSuggestionList();
    }
    /**
     * Method for sorting data
     */
    sortChange(e): void {
        this.sortColumn = e.active;
        this.sortDirection = e.direction;
        this.getSuggestionList();
    }

    /**
     * method for delete selected record
     */
    deleteRecord(id: number) {
        const confirmation = this.dialog.open(CommonDeleteModalComponent, {
            data: {
                title: 'Suggestions',
                message: 'Are you sure you want to delete this suggestion?',
            },
            width: '30%',
        });
        confirmation.afterClosed().subscribe((dialogResult) => {
            if (dialogResult === true) {
                // this.spinnerService.show();
                this.baseService.delete(Apiurl.suggestionsList + id).subscribe(
                    (response: any) => {
                        if (response) {
                            // this.spinnerService.show();
                            this.toastService.showToastMessage(
                                response.message,
                                'success-style'
                            );
                            this.getSuggestionList();
                        } else {
                            this.toastService.showToastMessage(
                                response.message,
                                'error-style'
                            );
                        }
                    },
                    (error) => {
                        // Handle errors
                        this.toastService.showToastMessage(
                            error,
                            'error-style'
                        );
                    }
                );
            }
        });
    }
    /**
     * method for display media files
     */
    openDialog(templateRef: TemplateRef<any>, data: any) {
        this.baseService
            .get(Apiurl.suggestionsList + data.id)
            .subscribe((res: any) => {
                if (res?.data?.Suggestion?.suggestionmedia?.length !== 0) {
                    this.suggestionmedia = [];
                    this.suggestionmedia = res.data.Suggestion.suggestionmedia
                    this.dialog.open(templateRef, {
                        disableClose: true,
                        width:'50%'
                    });
                } else {
                    this.toastService.showToastMessage(
                        'There is no files yet',
                        'warning-style'
                    );
                }
            });
    }
    /**
     * method for sanitize the url
     */
    sanitizeUrl(url: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
      }
      
}
