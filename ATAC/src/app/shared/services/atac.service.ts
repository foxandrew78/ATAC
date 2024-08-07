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
          return throwError(() => new Error(errorMessage));
        })
      );
  };
}
