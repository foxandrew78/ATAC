import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ATAC } from '../models/atac.model';
import { catchError, map, throwError } from 'rxjs';
import { DATA_SERVER } from '../localization/constants';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({ providedIn: 'root' })
export class AtacService {
  private httpClient = inject(HttpClient);
  dataSource = new MatTableDataSource<ATAC>([]);

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

  loadOpenATACs = () => {
    return this.fetchATAC(
      DATA_SERVER + 'atac',
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
