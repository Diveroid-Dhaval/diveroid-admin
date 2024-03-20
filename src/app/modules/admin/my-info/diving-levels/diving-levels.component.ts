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
    selector: 'app-diving-levels',
    templateUrl: './diving-levels.component.html',
    styleUrls: ['./diving-levels.component.scss'],
})
export class DivingLevelsComponent implements OnInit {
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
    divingLevelForm: FormGroup;
    submitted = false;
    activeFile: any;
    inActiveFile: any;
    activeImage;
    inActiveImage;
    organizationList: any = [];
    constructor(
        private baseService: BaseService,
        private toastService: ToastService,
        public dialog: MatDialog,
        private fb: FormBuilder,
        private loader: LoaderService
    ) {
        this.searchUpdater
            .pipe(debounceTime(1000), distinctUntilChanged())
            .subscribe(() => this.getDivingLevels());
    }

    ngOnInit(): void {
        this.searchText = new FormControl('');
        this.dataInitializer();
        this.defineForm();
    }

    /*---------------------------------
Private  methods
-----------------------------------*/

    /**
     * Method to initialize data
     */
    private dataInitializer(): void {
        this.initColumns();
        this.getDivingLevels();
    }

    /**
     * Method to initialize Columns field
     */
    private initColumns(): void {
        this.columns = ['id', 'LevelName', 'Name', 'action'];
    }
    /***
     * method for get all listing data
     */
    getDivingLevels() {
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

        this.baseService.get(Apiurl.divingLevelList, params).subscribe(
            (response: any) => {
                this.loader.hideLoader();
                if (response) {
                    this.dataSource.data = response.data.divingLevel;
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
                    this.getDivingLevels();
                }
                // this.toastService.showToastMessage(error, 'error-style');
            }
        );
    }
    /*---------------------------------
Public methods
-----------------------------------*/

    /**
     * method for set the organization data to dropdown
     */
    getStaticData() {
        this.baseService.get(Apiurl.organizations).subscribe((res: any) => {
            if (res) this.organizationList = res.data.Organizations;
        });
    }
    /**
     * method for define form
     */
    defineForm() {
        this.divingLevelForm = this.fb.group({
            LevelName: [
                '',
                [Validators.required, Validators.pattern(/^\S.*$/)],
            ],
            OrganizationId: ['', [Validators.required]],
        });
    }

    /**
     * update time set the form value
     */
    setFormValue(data: any) {
        this.id = data.id;
        this.divingLevelForm.controls.LevelName.setValue(data.LevelName);
        this.divingLevelForm.controls.OrganizationId.setValue(
            data.OrganizationId
        );
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
     * Method for sorting data
     */
    sortChange(e): void {
        this.sortColumn = e.active;
        this.sortDirection = e.direction;
        this.getDivingLevels();
    }

    /**
     *
     *method for open dialog box
     */
    openDialog(templateRef: TemplateRef<any>, isEdit: boolean, data?: any) {
        this.id = null;
        this.activeFile = null;
        this.inActiveFile = null;
        this.activeImage = null;
        this.inActiveImage = null;
        this.defineForm();
        this.getStaticData();
        this.isEdit = isEdit;
        this.submitted = false;
        this.dialog.open(templateRef, {
            disableClose: true,
            width: '25%',
            height: '40%',
        });
        if (this.isEdit) {
            this.setFormValue(data);
        }
    }

    /**
     * method for change page
     * @param event
     */
    pageChanged(event: PageEvent): void {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
        this.getDivingLevels();
    }

    /***
     * method for save form
     */
    saveForm() {
        this.submitted = true;
        if (!this.divingLevelForm.valid) {
            return;
        }
        if (this.isEdit) {
            this.baseService
                .put(
                    Apiurl.divingLevelList + this.id,
                    this.divingLevelForm.value
                )
                .subscribe(
                    (res: any) => {
                        if (res) {
                            this.toastService.showToastMessage(
                                res.message,
                                'success-style'
                            );
                            this.dialog.closeAll();
                            this.getDivingLevels();
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
                .post(Apiurl.divingLevelList, this.divingLevelForm.value)
                .subscribe(
                    (res: any) => {
                        if (res) {
                            this.toastService.showToastMessage(
                                res.message,
                                'success-style'
                            );
                            this.dialog.closeAll();
                            this.getDivingLevels();
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
                title: 'Diving Levels',
                message: 'Are you sure you want to delete this diving level?',
            },
            width: '30%',
        });
        confirmation.afterClosed().subscribe((dialogResult) => {
            if (dialogResult === true) {
                // this.spinnerService.show();
                this.baseService.delete(Apiurl.divingLevelList + id).subscribe(
                    (response: any) => {
                        if (response) {
                            // this.spinnerService.show();
                            this.toastService.showToastMessage(
                                response.message,
                                'success-style'
                            );
                            this.getDivingLevels();
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
