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
    selector: 'app-activity-medals',
    templateUrl: './activity-medals.component.html',
    styleUrls: ['./activity-medals.component.scss'],
})
export class ActivityMedalsComponent implements OnInit {
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
    activityMedalForm: FormGroup;
    submitted = false;
    selectedFile: any;
    imageFile;
    languageList: any = [];
    divingModeList: any = [];
    constructor(
        private baseService: BaseService,
        private toastService: ToastService,
        public dialog: MatDialog,
        private fb: FormBuilder,
        private loader: LoaderService
    ) {
        this.searchUpdater
            .pipe(debounceTime(1000), distinctUntilChanged())
            .subscribe(() => this.activityMedalsList());
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
        this.activityMedalsList();
    }

    /**
     * Method to initialize Columns field
     */
    private initColumns(): void {
        this.columns = [
            'id',
            'Thumb',
            'MaxLikes',
            'MinLikes',
            'MaxReviews',
            'MinReviews',
            'action',
        ];
    }
    /***
     * method for get all listing data
     */
    activityMedalsList() {
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

        this.baseService.get(Apiurl.activityMedalsList, params).subscribe(
            (response: any) => {
                this.loader.hideLoader();
                if (response) {
                    this.dataSource.data = response.data.activityMedal;
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
                    this.activityMedalsList();
                }
                // this.toastService.showToastMessage(error, 'error-style');
            }
        );
    }
    /*---------------------------------
Public methods
-----------------------------------*/

    /**
     * method for define form
     */
    defineForm() {
        this.activityMedalForm = this.fb.group({
            MinReviews: ['', [Validators.required, Validators.min(0)]],
            MaxReviews: ['', [Validators.required, Validators.min(1)]],
            MinLikes: ['', [Validators.required, Validators.min(0)]],
            MaxLikes: ['', [Validators.required, Validators.min(1)]],
        });
    }

    /**
     * update time set the form value
     */
    setFormValue(data: any) {
        this.id = data.id;
        this.activityMedalForm.controls.MinReviews.setValue(data.MinReviews);
        this.activityMedalForm.controls.MaxReviews.setValue(data.MaxReviews);
        this.activityMedalForm.controls.MinLikes.setValue(data.MinLikes);
        this.activityMedalForm.controls.MaxLikes.setValue(data.MaxLikes);
        this.imageFile = data?.Thumb;
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
        this.activityMedalsList();
    }

    /**
     *
     *method for open dialog box
     */
    openDialog(templateRef: TemplateRef<any>, isEdit: boolean, data?: any) {
        this.id = null;
        this.imageFile = null;
        this.selectedFile = null;
        this.defineForm();
        this.isEdit = isEdit;
        this.submitted = false;
        this.dialog.open(templateRef, {
            disableClose: true,
            width: '40%',
            height: '53%',
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
        this.activityMedalsList();
    }

    /***
     * method for save form
     */
    saveForm() {
        this.submitted = true;
        if (!this.activityMedalForm.valid) {
            return;
        }
        if (
            !this.activityMedalForm.valid ||
            (!this.isEdit && this.selectedFile == null)
        ) {
            return this.toastService.showToastMessage(
                'Please fill out the form correctly',
                'error-style'
            );
        }
        const APIURL = this.isEdit
            ? Apiurl.activityMedalsList + this.id
            : Apiurl.activityMedalsList;
        const formData = new FormData();
        const formValues = {
            MinLikes: this.activityMedalForm.value.MinLikes,
            MaxLikes: this.activityMedalForm.value.MaxLikes,
            MinReviews: this.activityMedalForm.value.MinReviews,
            MaxReviews: this.activityMedalForm.value.MaxReviews,
            file: this.selectedFile,
        };
        Object.entries(formValues).forEach(([key, value]) => {
            formData.append(key, value);
        });
        this.baseService.post(APIURL, formData).subscribe(
            (res: any) => {
                if (res) {
                    this.toastService.showToastMessage(
                        res.message,
                        'success-style'
                    );
                    this.dialog.closeAll();
                    this.activityMedalsList();
                }
            },
            (error) => {
                // Handle errors
                this.toastService.showToastMessage(error, 'error-style');
            }
        );
    }
    /**
     * method for delete selected record
     */
    deleteRecord(id: number) {
        const confirmation = this.dialog.open(CommonDeleteModalComponent, {
            data: {
                title: 'Activity Medals',
                message: 'Are you sure you want to delete this activity medal?',
            },
            width: '30%',
        });
        confirmation.afterClosed().subscribe((dialogResult) => {
            if (dialogResult === true) {
                // this.spinnerService.show();
                this.baseService
                    .delete(Apiurl.activityMedalsList + id)
                    .subscribe(
                        (response: any) => {
                            if (response) {
                                // this.spinnerService.show();
                                this.toastService.showToastMessage(
                                    response.message,
                                    'success-style'
                                );
                                this.activityMedalsList();
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
     * method for set the selected file and display
     */
    onFileSelected(event) {
        const reader = new FileReader();
        const file = event.target.files[0];
        if (
            file.type === 'image/jpeg' ||
            file.type === 'image/png' ||
            file.type === 'image/jpg'
        ) {
            if (file) reader.readAsDataURL(file);
            reader.onload = () => {
                this.imageFile = reader.result;
            };
            this.selectedFile = file;
        } else {
            this.toastService.showToastMessage(
                'Please select Image Extention .jpg .Jpeg .png format',
                'error-style'
            );
        }
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
}
