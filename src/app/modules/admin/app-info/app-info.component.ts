import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MonacoEditorConstructionOptions, MonacoEditorLoaderService } from '@materia-ui/ngx-monaco-editor';
import { CommonDeleteModalComponent } from 'app/shared/common-delete-modal/common-delete-modal.component';
import { Apiurl } from 'app/shared/route';
import { BaseService } from 'app/shared/service/base.service';
import { LoaderService } from 'app/shared/service/loader.service';
import { ToastService } from 'app/shared/service/toast.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-app-info',
  templateUrl: './app-info.component.html',
  styleUrls: ['./app-info.component.scss']
})

export class AppInfoComponent implements OnInit {
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
  appInfoForm: FormGroup;
  submitted = false;
  languageList: any = [];
  editorOptions: MonacoEditorConstructionOptions = {
      theme: 'default',
      language: 'html',
      roundedSelection: true,
      autoIndent: 'full',
  };

  constructor(
      private baseService: BaseService,
      private toastService: ToastService,
      public dialog: MatDialog,
      private fb: FormBuilder,
      private loader: LoaderService,
      private monacoLoaderService: MonacoEditorLoaderService
  ) {
      this.searchUpdater
          .pipe(debounceTime(1000), distinctUntilChanged())
          .subscribe(() => this.getAppInfoList());

      this.monacoLoaderService.isMonacoLoaded$.subscribe((isLoaded) => {
          if (isLoaded) {
              // Do initialization tasks if needed
          }
      });
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
      this.getAppInfoList();
  }

  /**
   * Method to get and set all data to data source   */
  private getAppInfoList(): void {
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
          .get(Apiurl.appInfoList, params)
          .subscribe((response: any) => {
              this.loader.hideLoader();
              if (response) {
                  this.dataSource.data = response.data.appInfo;
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
                    this.getAppInfoList();
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
          // 'Content',
          'Language',
          'Filename',
          'action',
      ];
  }

  /*---------------------------------
Public methods
-----------------------------------*/
  /**
   * language data  set to select option drop down list
   */
  getStaticData() {
      this.baseService.get(Apiurl.languages).subscribe((res: any) => {
          if (res) this.languageList = res.data.languages;
      });
  }
  /**
   * define form
   */
  defineForm() {
      this.appInfoForm = this.fb.group({
          Title: ['', [Validators.required, Validators.pattern(/^\S.*$/)]],
          LanguageId: ['', [Validators.required]],
          Content: [''],
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
          width: '35%',
          height: '71%',
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
      this.appInfoForm.controls.Title.setValue(data.Title);
      this.appInfoForm.controls.LanguageId.setValue(data.LanguageId);
      this.appInfoForm.controls.Content.setValue(data.Content);
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
      this.getAppInfoList();
  }
  /**
   * Method for sorting data
   */
  sortChange(e): void {
      this.sortColumn = e.active;
      this.sortDirection = e.direction;
      this.getAppInfoList();
  }
  /**
   * method for save form
   * @returns if form is not valid
   */
  saveForm() {
      this.submitted = true;
      if (!this.appInfoForm.valid) {
          return;
      }
      if (this.isEdit) {
          this.baseService
              .put(Apiurl.appInfoList + this.id, this.appInfoForm.value)
              .subscribe(
                  (res: any) => {
                      if (res) {
                          this.toastService.showToastMessage(
                              res.message,
                              'success-style'
                          );
                          this.dialog.closeAll();
                          this.getAppInfoList();
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
              .post(Apiurl.appInfoList, this.appInfoForm.value)
              .subscribe(
                  (res: any) => {
                      if (res) {
                          this.toastService.showToastMessage(
                              res.message,
                              'success-style'
                          );
                          this.dialog.closeAll();
                          this.getAppInfoList();
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
              title: 'App Info',
              message: 'Are you sure you want to delete this app info?',
          },
          width: '30%',
      });
      confirmation.afterClosed().subscribe((dialogResult) => {
          if (dialogResult === true) {
              // this.spinnerService.show();
              this.baseService.delete(Apiurl.appInfoList + id).subscribe(
                  (response: any) => {
                      if (response) {
                          // this.spinnerService.show();
                          this.toastService.showToastMessage(
                              response.message,
                              'success-style'
                          );
                          this.getAppInfoList();
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