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
    selector: 'app-subscription-store-features',
    templateUrl: './subscription-store-features.component.html',
    styleUrls: ['./subscription-store-features.component.scss'],
})
export class SubscriptionStoreFeaturesComponent implements OnInit {
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
    storeFeatureForm: FormGroup;
    submitted = false;
    subscriptionList: any = [];
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
            .subscribe(() => this.getSubscriptionStoreFeatures());
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
        this.getSubscriptionStoreFeatures();
    }

    /**
     * Method to get and set all data to data source     */
    private getSubscriptionStoreFeatures(): void {
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
            .get(Apiurl.subscriptionStoreFeatures, params)
            .subscribe((response: any) => {
                this.loader.hideLoader();
                if (response) {
                    this.dataSource.data =
                        response.data.subscriptionStoreFeatures;
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
                    this.getSubscriptionStoreFeatures();
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
            'IndividualGroup',
            'SubscriptionGroup',
            'SubscriptionName',
            'action',
        ];
    }

    /*---------------------------------
Public methods
-----------------------------------*/
    /**
     * subscription data and feature data set to select option drop down list
     */
    getStaticData() {
        this.baseService.get(Apiurl.subscription).subscribe((res: any) => {
            if (res) this.subscriptionList = res.data.subscriptions;
        });
        this.baseService.get(Apiurl.featureList).subscribe((res: any) => {
            if (res) this.featureList = res.data.Features;
        });
    }
    /**
     * define form
     */
    defineForm() {
        this.storeFeatureForm = this.fb.group({
            SubscriptionId: ['', [Validators.required]],
            FeatureId: ['', [Validators.required]],
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
            height: '40%',
            width: '20%',
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
        this.storeFeatureForm.controls.SubscriptionId.setValue(
            data.SubscriptionId
        );
        this.storeFeatureForm.controls.FeatureId.setValue(data.FeatureId);
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
        this.getSubscriptionStoreFeatures();
    }
    /**
     * Method for sorting data
     */
    sortChange(e): void {
        this.sortColumn = e.active;
        this.sortDirection = e.direction;
        this.getSubscriptionStoreFeatures();
    }
    /**
     * method for save form
     * @returns if form is not valid
     */
    saveForm() {
        this.submitted = true;
        if (!this.storeFeatureForm.valid) {
            return;
        }
        if (this.isEdit) {
            this.baseService
                .put(
                    Apiurl.subscriptionStoreFeatures + this.id,
                    this.storeFeatureForm.value
                )
                .subscribe(
                    (res: any) => {
                        if (res) {
                            this.toastService.showToastMessage(
                                res.message,
                                'success-style'
                            );
                            this.dialog.closeAll();
                            this.getSubscriptionStoreFeatures();
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
                .post(
                    Apiurl.subscriptionStoreFeatures,
                    this.storeFeatureForm.value
                )
                .subscribe(
                    (res: any) => {
                        if (res) {
                            this.toastService.showToastMessage(
                                res.message,
                                'success-style'
                            );
                            this.dialog.closeAll();
                            this.getSubscriptionStoreFeatures();
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
                title: 'Subscription Store Features',
                message:
                    'Are you sure you want to delete this subscription store feature?',
            },
            width: '30%',
        });
        confirmation.afterClosed().subscribe((dialogResult) => {
            if (dialogResult === true) {
                // this.spinnerService.show();
                this.baseService
                    .delete(Apiurl.subscriptionStoreFeatures + id)
                    .subscribe(
                        (response: any) => {
                            if (response) {
                                // this.spinnerService.show();
                                this.toastService.showToastMessage(
                                    response.message,
                                    'success-style'
                                );
                                this.getSubscriptionStoreFeatures();
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
}
