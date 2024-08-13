import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ATAC } from '../models/atac.model';
import { catchError, map, throwError } from 'rxjs';
import { DATA_SERVER } from '../localization/constants';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';

@Injectable({ providedIn: 'root' })
export class AtacService {
  private httpClient = inject(HttpClient);
  dataSource = new MatTableDataSource<ATAC>([]);
  getClosed = signal(false);

  fetchingData = signal<boolean>(true);
  backendError = signal<string>('');
  searchATAC = new FormControl('');
  showClosedToggleSwitch = new FormControl(false);
  tableSort = new MatSort();
  // tablePaginator: new MatPaginator();

  private getTimeDifference = (previousTime: string | null) => {
    if (previousTime) {
      return (Date.now() - new Date(previousTime).getTime()) / 60000;
    }
    return 0;
  };

  onClearSearch() {
    this.dataSource.filter = '';
    this.searchATAC.setValue('');
  }

  loadAtacs = (atacType: 'open' | 'closed', forceFetch?: boolean) => {
    this.fetchingData.set(true);
    this.searchATAC.disable();
    this.showClosedToggleSwitch.disable();

    var localData: string | null;
    var lastRefreshData: string | null;

    switch (atacType) {
      case 'open':
        localData = localStorage.getItem('openAtacData');
        lastRefreshData = localStorage.getItem('openAtacLastRefresh');
        break;
      case 'closed':
        localData = localStorage.getItem('closedAtacData');
        lastRefreshData = localStorage.getItem('closedAtacLastRefresh');
        break;
      default:
        localData = null;
        lastRefreshData = Date.now().toString();
        break;
    }

    const lastRefreshInterval = this.getTimeDifference(lastRefreshData);

    if (localData && lastRefreshInterval < 20 && !forceFetch) {
      if (atacType === 'open') {
        this.dataSource.data = JSON.parse(localData);
        this.dataSource.sort?.sortChange.emit();
      }
      if (atacType === 'closed') {
        this.dataSource.data = [
          ...JSON.parse(localStorage.getItem('openAtacData')!),
          ...JSON.parse(localData),
        ].sort((a, b) => Date.parse(b.date_opened) - Date.parse(a.date_opened));
        this.dataSource.sort?.sortChange.emit();
      }
      this.fetchingData.set(false);
      this.searchATAC.enable();
      this.showClosedToggleSwitch.enable();
    } else {
      this.fetchData(atacType);
      if (forceFetch) {
        this.onClearSearch();
      }
    }
  };

  fetchData(atacType: 'open' | 'closed') {
    const loadFunction =
      atacType === 'closed'
        ? this.loadClosedATACs()
        : atacType === 'open'
        ? this.loadOpenATACs()
        : this.loadOpenATACs();

    const subscription = loadFunction.subscribe({
      error: (error: Error) => {
        this.backendError.set(error.message);
        this.fetchingData.set(false);
      },
      next: (data) => {
        switch (atacType) {
          case 'open':
            this.dataSource.data = data.sort(
              (a, b) => Date.parse(b.date_opened) - Date.parse(a.date_opened)
            );
            this.dataSource.sort?.sortChange.emit();
            localStorage.setItem('openAtacData', JSON.stringify(data));
            localStorage.setItem(
              'openAtacLastRefresh',
              new Date().toUTCString()
            );
            break;
          case 'closed':
            this.dataSource.data = [
              ...JSON.parse(localStorage.getItem('openAtacData')!),
              ...data,
            ].sort(
              (a, b) => Date.parse(b.date_opened) - Date.parse(a.date_opened)
            );
            this.dataSource.sort?.sortChange.emit();
            localStorage.setItem('closedAtacData', JSON.stringify(data));
            localStorage.setItem(
              'closedAtacLastRefresh',
              new Date().toUTCString()
            );

            break;
          default:
            break;
        }
      },
      complete: () => {
        this.backendError.set('');
        this.fetchingData.set(false);
        this.searchATAC.enable();
        this.showClosedToggleSwitch.enable();
      },
    });
    // this.destroyRef.onDestroy(() => {
    //   subscription.unsubscribe();
    // });
  }
  /*
  TODO
  removeData(id: number) {
    console.log(this.dataSource.data);
    console.log(
      this.dataSource.data.filter((el) => {
        return el.id !== id;
      })
    );

    this.dataSource.data = this.dataSource.data.filter((el) => {
      return el.id !== id;
    });
  }
  addData() {
    this.dataSource.data = [
      ...this.dataSource.data,
      {
        id: 854,
        device: 'OHV854',
        date_opened: '2020-05-12T15:12:00.000Z',
        level: 1,
        owner: 'Andrew Fox',
        summary: 'Explosion',
        detail:
          'There was a POW4C issue whilst OHV was travelling which caused the OHV to explode on the track',
      },
    ];
  }
*/

  test = () => {
    this.dataSource.data = [
      ...this.dataSource.data,
      {
        id: 1156,
        status: 'closed',
        device: 'OHV1156',
        date_opened: '2022-01-17T21:43:00.000Z',
        owner: 'Andrew Fox',
        problem_statement: 'Left guide roller not switching',
        detail:
          'Guide roller on left hand side of OHV did not move when commanded to.',
      },
    ];
  };
  loadOpenATACs = () => {
    return this.fetchATAC(
      DATA_SERVER + 'atac',
      'An error occured while fetching data from the server.'
    );
  };
  loadClosedATACs = () => {
    return this.fetchATAC(
      DATA_SERVER + 'atac?getClosed=true',
      'An error occured while fetching data from the server.'
    );
  };

  private fetchATAC = (url: string, errorMessage: string) => {
    return this.httpClient
      .get<{ atac: ATAC[] }>(url)

      .pipe(
        map((resData) => resData.atac),
        catchError((error) => {
          console.log(error);
          let errorText: string;

          switch (error.status) {
            case 500:
              errorText = errorMessage;
              break;
            case 401:
              errorText = 'You are not authorised to access that.';
              break;
            default:
              errorText =
                'There is an error on the server. Please try again later.';
              break;
          }
          return throwError(() => new Error(errorText));
        })
      );
  };
}
