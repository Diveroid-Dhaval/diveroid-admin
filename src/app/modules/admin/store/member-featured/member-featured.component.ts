import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Apiurl } from 'app/shared/route';
import { BaseService } from 'app/shared/service/base.service';
import { LoaderService } from 'app/shared/service/loader.service';
import { ToastService } from 'app/shared/service/toast.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-member-featured',
  templateUrl: './member-featured.component.html',
  styleUrls: ['./member-featured.component.scss']
})
export class MemberFeaturedComponent implements OnInit {
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

  constructor(
      private baseService: BaseService,
      private toastService: ToastService,
      public dialog: MatDialog,
      private loader: LoaderService
  ) {
      this.searchUpdater
          .pipe(debounceTime(1000), distinctUntilChanged())
          .subscribe(() => this.getMemberFeaturedList());
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
      this.getMemberFeaturedList();
  }

  /**
   * Method to get and set all data to data source   */
  private getMemberFeaturedList(): void {
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
          .get(Apiurl.memberFeaturedList, params)
          .subscribe((response: any) => {
              this.loader.hideLoader();
              if (response) {
                  this.dataSource.data =
                      response.data.memberFeatures;
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
                    this.getMemberFeaturedList();
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
          'Name',
          'FeatureName',
          'MobileDetails',
          'PriceCurrency',
          'Price',
          'status',
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
      this.getMemberFeaturedList();
  }
  /**
   * Method for sorting data
   */
  sortChange(e): void {
      this.sortColumn = e.active;
      this.sortDirection = e.direction;
      this.getMemberFeaturedList();
  }
}

