import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-po2-percentage',
  templateUrl: './po2-percentage.component.html',
  styleUrls: ['./po2-percentage.component.scss']
})

export class Po2PercentageComponent implements OnInit {
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
  po2Form: FormGroup;
  submitted = false;

  constructor(
      private baseService: BaseService,
      private toastService: ToastService,
      public dialog: MatDialog,
      private fb: FormBuilder,
      private loader: LoaderService
  ) {
      this.searchUpdater
          .pipe(debounceTime(1000), distinctUntilChanged())
          .subscribe(() => this.getPO2List());
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
      this.getPO2List();
  }

  /**
   * Method to get and set all data to data source   */
  private getPO2List(): void {
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
          .get(Apiurl.po2PercentageList, params)
          .subscribe((response: any) => {
              this.loader.hideLoader();
              if (response) {
                  this.dataSource.data = response.data.po2Percentage;
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
                    this.getPO2List();
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
          'MinValue',
          'MaxValue',
          'Interval',
          'action',
      ];
  }

  /*---------------------------------
Public methods
-----------------------------------*/

  /**
   * define form
   */
  defineForm() {
      this.po2Form = this.fb.group({
        MinValue: ['', [Validators.required, Validators.min(0)]],
        MaxValue: ['', [Validators.required, Validators.min(0)]],
        Interval: ['', [Validators.required, Validators.min(0)]],
      });
  }

  /**
   *
   *method for open dialog box
   */
  openDialog(templateRef: TemplateRef<any>, isEdit: boolean, data?: any) {
      this.id = null;
      this.defineForm();
      this.isEdit = isEdit;
      this.submitted = false;
      this.dialog.open(templateRef, {
          disableClose: true,
          width: '28%',
          height: '33%',
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
      this.po2Form.controls.MinValue.setValue(data.MinValue);
      this.po2Form.controls.MaxValue.setValue(data.MaxValue);
      this.po2Form.controls.Interval.setValue(data.Interval);
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
      this.getPO2List();
  }
  /**
   * Method for sorting data
   */
  sortChange(e): void {
      this.sortColumn = e.active;
      this.sortDirection = e.direction;
      this.getPO2List();
  }
  /**
   * method for save form
   * @returns if form is not valid
   */
  saveForm() {
      this.submitted = true;
      if (!this.po2Form.valid) {
          return;
      }
      if (this.isEdit) {
          this.baseService
              .put(Apiurl.po2PercentageList + this.id, this.po2Form.value)
              .subscribe(
                  (res: any) => {
                      if (res) {
                          this.toastService.showToastMessage(
                              res.message,
                              'success-style'
                          );
                          this.dialog.closeAll();
                          this.getPO2List();
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
              .post(Apiurl.po2PercentageList, this.po2Form.value)
              .subscribe(
                  (res: any) => {
                      if (res) {
                          this.toastService.showToastMessage(
                              res.message,
                              'success-style'
                          );
                          this.dialog.closeAll();
                          this.getPO2List();
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
              title: 'PO2 Percentage',
              message: 'Are you sure you want to delete this PO2 percentage?',
          },
          width: '30%',
      });
      confirmation.afterClosed().subscribe((dialogResult) => {
          if (dialogResult === true) {
              // this.spinnerService.show();
              this.baseService.delete(Apiurl.po2PercentageList + id).subscribe(
                  (response: any) => {
                      if (response) {
                          // this.spinnerService.show();
                          this.toastService.showToastMessage(
                              response.message,
                              'success-style'
                          );
                          this.getPO2List();
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
        const disallowedKeys = ['e', 'E', '+', '-'];
        if (disallowedKeys.includes(event.key)) {
            event.preventDefault();
        }
    }
}
