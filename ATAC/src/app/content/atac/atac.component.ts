import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DataSource } from '@angular/cdk/collections';
import { DATE_PIPE_DEFAULT_OPTIONS, DatePipe } from '@angular/common';
import { Component, inject, input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { filter, Observable, ReplaySubject } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { TooltipPosition, MatTooltipModule } from '@angular/material/tooltip';
import { B } from '@angular/cdk/keycodes';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

export interface ATAC {
  id: number;
  device: string;
  date_opened: Date;
  level: number;
  owner: string;
  summary: string;
  detail: string;
}
const ATAC_DATA: ATAC[] = [
  {
    id: 123,
    device: 'OHV123',
    date_opened: new Date('2024-05-12 15:12'),
    level: 1,
    owner: 'Andrew Fox',
    summary: 'POW4C issue - possible overheating?',
    detail: 'There was a POW4C issue whilst OHV was travelling.',
  },
  {
    id: 456,
    device: 'OHV1259',
    date_opened: new Date('2024-07-17 23:43'),
    level: 1,
    summary: 'Right guide roller stuck in position',
    detail: 'Right guide roller did not move when requested to.',
    owner: 'Jeff Carter',
  },
  {
    id: 1023,
    device: 'OHV123',
    date_opened: new Date('2023-11-12 11:12'),
    level: 1,
    owner: 'Andrew Fox',
    summary: 'CPU overheating',
    detail: 'Temperature sensor on CPU board triggering the overtemp circuit.',
  },
  {
    id: 1156,
    device: 'OHV1156',
    date_opened: new Date('2022-01-17 21:43'),
    level: 2,
    owner: 'Andrew Fox',
    summary: 'Left guide roller not switching',
    detail:
      'Guide roller on left hand side of OHV did not move when commanded to.',
  },
  {
    id: 321,
    device: 'VHL123',
    date_opened: new Date('2024-07-17 23:43'),
    level: 2,
    owner: 'Mark Duffy',
    summary: 'JL toggling on/off unexpectedly',
    detail: 'JL sensor toggling while travelling on track',
  },
  {
    id: 763,
    device: 'SSR123',
    date_opened: new Date('2024-07-12 13:43'),
    level: 1,
    owner: 'Keith Howard',
    summary: 'J4 position errors',
    detail:
      'RM having issues when travelling between shelf 1-10-22 and port 6 (OHV port). MU shows J4 error.',
  },
].sort((a, b) => b.date_opened.getTime() - a.date_opened.getTime());

@Component({
  selector: 'app-atac',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    DatePipe,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule,
  ],
  providers: [
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: 'dd MMM yyyy', timezone: 'UTC' },
    },
  ],
  templateUrl: './atac.component.html',
  styleUrl: './atac.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ATACComponent {
  private router = inject(Router);

  displayedColumns: string[] = ['date_opened', 'device', 'summary'];

  expandedElement!: ATAC | null;
  dataToDisplay = [...ATAC_DATA];

  id = input<string>();
  dataSource = new MatTableDataSource<ATAC>(ATAC_DATA);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: ATAC, filter: string) =>
      data.device.toLowerCase().includes(filter) ||
      data.summary.toLowerCase().includes(filter) ||
      data.detail.toLowerCase().includes(filter);
  }

  addData() {
    const randomElementIndex = Math.floor(Math.random() * ATAC_DATA.length);
    this.dataToDisplay = [...this.dataToDisplay, ATAC_DATA[randomElementIndex]];
    this.dataSource.data = this.dataToDisplay;
  }

  removeData() {
    this.dataToDisplay = this.dataToDisplay.slice(0, -1);
    this.dataSource.data = this.dataToDisplay;
  }

  logTest(row: string) {
    console.log(row);
    this.router.navigate([/ATAC/, row]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

class ExampleDataSource extends MatTableDataSource<ATAC> {
  //private _dataStream = new ReplaySubject<ATAC[]>();
  // constructor(initialData: ATAC[]) {
  //   //console.log(initialData);
  //   super();
  //   this.data = initialData;
  //   //this.setData(initialData);
  // }
  // connect(): Observable<ATAC[]> {
  //   return this._dataStream;
  // }
  // disconnect() {}
  // setData(data: ATAC[]) {
  //   this._dataStream.next(data);
  // }
}
