import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {
    Component,
    NgZone,
    OnInit,
    TemplateRef,
    ViewChild,
} from '@angular/core';
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
import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';

@Component({
    selector: 'app-third-party-camera',
    templateUrl: './third-party-camera.component.html',
    styleUrls: ['./third-party-camera.component.scss'],
})
export class ThirdPartyCameraComponent implements OnInit {
    @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
    @ViewChild('filter', { static: false }) filter: any;
    @ViewChild('autosize') autosize: CdkTextareaAutosize;
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
    cameraForm: FormGroup;
    submitted = false;
    selectedFile: any;
    imageFile;
    constructor(
        private baseService: BaseService,
        private toastService: ToastService,
        public dialog: MatDialog,
        private fb: FormBuilder,
        private loader: LoaderService
    ) {
        this.searchUpdater
            .pipe(debounceTime(1000), distinctUntilChanged())
            .subscribe(() => this.getAllCameraList());
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
        this.getAllCameraList();
    }

    /**
     * Method to initialize Columns field
     */
    private initColumns(): void {
        this.columns = ['id', 'Name', 'Thumb', 'action'];
    }
    /***
     * method for get all listing data
     */
    getAllCameraList() {
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

        this.baseService.get(Apiurl.thirdPartyCameraList, params).subscribe(
            (response: any) => {
                this.loader.hideLoader();
                if (response) {
                    this.dataSource.data = response.data.thirdPartyCamera;
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
                    this.getAllCameraList();
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
        this.cameraForm = this.fb.group({
            Name: ['', [Validators.required, Validators.pattern(/^\S.*$/)]],
            Description: [''],
        });
    }

    /**
     * update time set the form value
     */
    setFormValue(data: any) {
        this.id = data.id;
        this.cameraForm.controls.Name.setValue(data.Name);
        this.cameraForm.controls.Description.setValue(data.Description);
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
        this.getAllCameraList();
    }

    /**
     *
     *method for open dialog box
     */
    openDialog(templateRef: TemplateRef<any>, isEdit: boolean, data?: any) {
        this.id = null;
        this.selectedFile = null;
        this.imageFile = null;
        this.defineForm();
        this.isEdit = isEdit;
        this.submitted = false;
        this.dialog.open(templateRef, {
            disableClose: true,
            width: '30%',
            height: '56%',
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
        this.getAllCameraList();
    }

    /***
     * method for save form
     */
    saveForm() {
        this.submitted = true;
        if (!this.cameraForm.valid) {
            return;
        }
        if (
            !this.cameraForm.valid ||
            (!this.isEdit && this.selectedFile == null)
        ) {
            return this.toastService.showToastMessage(
                'Please fill out the form correctly',
                'error-style'
            );
        }
        const APIURL = this.isEdit
            ? Apiurl.thirdPartyCameraList + this.id
            : Apiurl.thirdPartyCameraList;
        const formData = new FormData();
        const formValues = {
            Name: this.cameraForm.value.Name,
            Description: this.cameraForm.value.Description,
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
                    this.getAllCameraList();
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
                title: 'Third Party Cameras',
                message:
                    'Are you sure you want to delete this this third party camera?',
            },
            width: '30%',
        });
        confirmation.afterClosed().subscribe((dialogResult) => {
            if (dialogResult === true) {
                // this.spinnerService.show();
                this.baseService
                    .delete(Apiurl.thirdPartyCameraList + id)
                    .subscribe(
                        (response: any) => {
                            if (response) {
                                // this.spinnerService.show();
                                this.toastService.showToastMessage(
                                    response.message,
                                    'success-style'
                                );
                                this.getAllCameraList();
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
            file.type === 'image/jpg' ||
            file.type === 'image/webp'
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
}
