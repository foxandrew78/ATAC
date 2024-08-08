import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ATAC } from '../models/atac.model';
import { catchError, map, throwError } from 'rxjs';
import { DATA_SERVER } from '../localization/constants';

@Injectable({ providedIn: 'root' })
export class AtacService {
  private httpClient = inject(HttpClient);

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
