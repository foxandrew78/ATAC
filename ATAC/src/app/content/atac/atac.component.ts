import { DATE_PIPE_DEFAULT_OPTIONS, DatePipe, NgClass } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLinkWithHref } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

import { ATAC } from '../../shared/models/atac.model';
import { AtacService } from '../../shared/services/atac.service';
import { LoadingPlaceholderComponent } from '../../shared/components/loading-placeholder/loading-placeholder.component';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DATE_FORMAT, TIMEZONE } from '../../shared/localization/constants';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

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
    LoadingPlaceholderComponent,
    NgClass,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: DATE_FORMAT, timezone: TIMEZONE },
    },
  ],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed,void',
        style({ height: '0px', minHeight: '0', margin: 0, padding: 0 })
      ),
      state(
        'expanded',
        style({
          height: '*',
          paddingBottom: '1.2em',
          paddingTop: '1.2em',
          borderTop: '1px dashed',
        })
      ),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
  templateUrl: './atac.component.html',
  styleUrl: './atac.component.scss',
})
export class ATACComponent implements AfterViewInit, OnInit {
  private router = inject(Router);
  private atacService = inject(AtacService);
  private destroyRef = inject(DestroyRef);

  dataSource = this.atacService.dataSource;
  displayedColumns: string[] = ['date_opened', 'device', 'problem_statement'];
  displayedColumnsWithExpand: string[] = [...this.displayedColumns, 'expand'];

  fetchingData = signal<boolean>(true);
  backendError = signal<string>('');
  searchATAC = new FormControl('');

  id = input<string>();
  expandedId?: number;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  fetchNewData() {
    const loadFunction = this.atacService.getClosed
      ? this.atacService.loadClosedATACs()
      : this.atacService.loadOpenATACs();

    const subscription = loadFunction.subscribe({
      error: (error: Error) => {
        this.backendError.set(error.message);
        this.fetchingData.set(false);
      },
      next: (data) => {
        this.dataSource.data = data.sort(
          (a, b) => Date.parse(b.date_opened) - Date.parse(a.date_opened)
        );
        localStorage.setItem('atacData', JSON.stringify(data));
        localStorage.setItem('atacLastRefresh', new Date().toUTCString());
      },
      complete: () => {
        this.backendError.set('');
        this.fetchingData.set(false);
        this.searchATAC.enable();
      },
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  ngOnInit() {
    const localData = localStorage.getItem('atacData');

    const lastRefresh =
      (Date.now() -
        (localStorage.getItem('atacLastRefresh')
          ? new Date(localStorage.getItem('atacLastRefresh')!).getTime()
          : Date.now())) /
      60000;

    if (localData && lastRefresh < 20) {
      this.dataSource.data = JSON.parse(localData);
      this.fetchingData.set(false);
    } else {
      this.onRefresh();
    }
  }

  onRefresh() {
    this.fetchingData.set(true);
    this.searchATAC.disable();
    this.fetchNewData();
    this.onClearSearch();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: ATAC, filter: string) =>
      data.device.toLowerCase().includes(filter) ||
      data.problem_statement.toLowerCase().includes(filter) ||
      data.detail.toLowerCase().includes(filter);
  }

  viewATAC(row: string) {
    this.router.navigate([/ATAC/, row]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onClearSearch() {
    this.dataSource.filter = '';
    this.searchATAC.setValue('');
  }
}
