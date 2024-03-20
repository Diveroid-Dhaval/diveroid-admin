import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommonDeleteModalComponent } from 'app/shared/common-delete-modal/common-delete-modal.component';
import { Apiurl } from 'app/shared/route';
import { BaseService } from 'app/shared/service/base.service';
import { LoaderService } from 'app/shared/service/loader.service';
import { ToastService } from 'app/shared/service/toast.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-feature-pricing',
    templateUrl: './feature-pricing.component.html',
    styleUrls: ['./feature-pricing.component.scss'],
})
export class FeaturePricingComponent implements OnInit {
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
    isEdit: boolean = false;
    id: any;
    pricingForm: FormGroup;
    submitted = false;
    featureList: any = [];

    constructor(
        private baseService: BaseService,
        private toastService: ToastService,
        public dialog: MatDialog,
        private fb: FormBuilder,
        private loader: LoaderService
    ) {
        this.searchUpdater
            .pipe(debounceTime(1000), distinctUntilChanged())
            .subscribe(() => this.getFeaturePricingList());
    }

    ngOnInit(): void {
        this.searchText = new FormControl('');
        this.dataInitializer();
        this.defineForm();
    }

    /**
     * Method to initialize data
     */
    private dataInitializer(): void {
        this.initColumns();
        this.getFeaturePricingList();
    }

    /**
     * Method to get and set all data to data source     */
    private getFeaturePricingList(): void {
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
            .get(Apiurl.featurePricingList, params)
            .subscribe((response: any) => {
                this.loader.hideLoader();
                if (response) {
                    this.dataSource.data = response.data.featurePricings;
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
                    this.getFeaturePricingList();
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
            'FeatureName',
            'Title',
            'GoogleProductId',
            'AppleProductId',
            'Price',
            'Trial',
            'Duration',
            'action',
        ];
    }

    /*---------------------------------
Public methods
-----------------------------------*/
    /**
     * subscription data  set to select option drop down list
     */
    getStaticData() {
        this.baseService.get(Apiurl.featureList).subscribe((res: any) => {
            if (res) this.featureList = res.data.Features;
        });
    }
    /**
     * define form
     */
    defineForm() {
        this.pricingForm = this.fb.group({
            FeatureId: ['', [Validators.required]],
            Title: [
                '',
                [Validators.pattern(/^\S.*$/)],
            ],
            GoogleProductId: ['', [Validators.required,Validators.pattern(/^\S.*$/)]],
            AppleProductId: [
                '',
                [Validators.required, Validators.pattern(/^\S.*$/)],
            ],
            Price: ['', [Validators.required,Validators.min(0)]],
            Trial: ['', [Validators.required,Validators.min(0)]],
            Duration: [
                '',
                [Validators.required, Validators.pattern(/^\S.*$/)],
            ],
        });
    }

    /**
     *
     *method for open dialog box
     */
    openDialog(templateRef: TemplateRef<any>, isEdit: boolean, data?: any) {
        this.id = null;
        this.defineForm();
        this.getStaticData();
        this.isEdit = isEdit;
        this.submitted = false;
        this.dialog.open(templateRef, {
            disableClose: true,
            height: '52%',
            width: '30%',
        });
        if (this.isEdit) {
            this.setFormValue(data);
        }
    }
    /**
     * update time set the form value to form control
     */
    setFormValue(data: any) {
        this.id = data.id;
        this.pricingForm.controls.Title.setValue(data.Title);
        this.pricingForm.controls.FeatureId.setValue(data.FeatureId);
        this.pricingForm.controls.GoogleProductId.setValue(
            data.GoogleProductId
        );
        this.pricingForm.controls.AppleProductId.setValue(data.AppleProductId);
        this.pricingForm.controls.Price.setValue(data.Price);
        this.pricingForm.controls.Trial.setValue(data.Trial);
        this.pricingForm.controls.Duration.setValue(data.Duration);
    }
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
        this.getFeaturePricingList();
    }
    /**
     * Method for sorting data
     */
    sortChange(e): void {
        this.sortColumn = e.active;
        this.sortDirection = e.direction;
        this.getFeaturePricingList();
    }
    /**
     * method for save form
     * @returns if form is not valid
     */
    saveForm() {
        this.submitted = true;
        if (!this.pricingForm.valid) {
            return;
        }
        if (this.isEdit) {
            this.baseService
                .put(
                    Apiurl.featurePricingList + this.id,
                    this.pricingForm.value
                )
                .subscribe(
                    (res: any) => {
                        if (res) {
                            this.toastService.showToastMessage(
                                res.message,
                                'success-style'
                            );
                            this.dialog.closeAll();
                            this.getFeaturePricingList();
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
        } else if (!this.isEdit) {
            this.baseService
                .post(Apiurl.featurePricingList, this.pricingForm.value)
                .subscribe(
                    (res: any) => {
                        if (res) {
                            this.toastService.showToastMessage(
                                res.message,
                                'success-style'
                            );
                            this.dialog.closeAll();
                            this.getFeaturePricingList();
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
    }
    /**
     * method for delete selected record
     */
    deleteRecord(id: number) {
        const confirmation = this.dialog.open(CommonDeleteModalComponent, {
            data: {
                title: 'Features with Pricing',
                message:
                    'Are you sure you want to delete this featrure with pricing?',
            },
            width: '30%',
        });
        confirmation.afterClosed().subscribe((dialogResult) => {
            if (dialogResult === true) {
                // this.spinnerService.show();
                this.baseService
                    .delete(Apiurl.featurePricingList + id)
                    .subscribe(
                        (response: any) => {
                            if (response) {
                                // this.spinnerService.show();
                                this.toastService.showToastMessage(
                                    response.message,
                                    'success-style'
                                );
                                this.getFeaturePricingList();
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
     /***
     * method for accept only numbers
     */
     keyPress(event: KeyboardEvent): void {
        const disallowedKeys = ['e', 'E', '+', '-', '.'];
        if (disallowedKeys.includes(event.key)) {
            event.preventDefault();
        }
    }
    /**
     * method for price allow only float values
     * @param event
     */
    keyPress1(event: KeyboardEvent): void {
        const disallowedKeys = ['e', 'E', '+', '-'];
        if (disallowedKeys.includes(event.key)) {
            event.preventDefault();
        }
    }
}
