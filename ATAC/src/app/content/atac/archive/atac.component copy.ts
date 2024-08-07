import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DataSource } from '@angular/cdk/collections';
import { DATE_PIPE_DEFAULT_OPTIONS, DatePipe } from '@angular/common';
import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  signal,
  ViewChild,
} from '@angular/core';
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
import { ATAC } from '../../../shared/models/atac.model';
import { AtacService } from '../../../shared/services/atac.service';
import { LoadingPlaceholderComponent } from '../../../shared/components/loading-placeholder/loading-placeholder.component';

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
    LoadingPlaceholderComponent,
  ],
  providers: [
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: 'dd MMM yyyy', timezone: 'UTC' },
    },
  ],
  templateUrl: './atac.component.html',
  styleUrl: './atac.component.scss',
})
export class ATACComponent {
  private router = inject(Router);
  private atacService = inject(AtacService);
  private destroyRef = inject(DestroyRef);
  ATAC_DATA = signal<ATAC[]>([]);
  dataToDisplay = computed(() =>
    [...this.ATAC_DATA()].sort(
      (a, b) => Date.parse(b.date_opened) - Date.parse(a.date_opened)
    )
  );
  dataSource = new MatTableDataSource<ATAC>();

  fetchingData = true;
  displayedColumnsWithExpand: any;
  ngOnInit() {
    const subscription = this.atacService.loadOpenATACs().subscribe({
      error: (error: Error) => {
        console.log(error);
      },
      next: (atacs) => {
        this.ATAC_DATA.set(atacs);
        this.dataSource.data = atacs.sort(
          (a, b) => Date.parse(b.date_opened) - Date.parse(a.date_opened)
        );
      },
      complete: () => {
        //this.dataSource.data = this.dataToDisplay();

        this.fetchingData = false;
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  displayedColumns: string[] = ['date_opened', 'device', 'summary'];

  id = input<string>();

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
