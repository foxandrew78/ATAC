import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-placeholder',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './loading-placeholder.component.html',
  styleUrl: './loading-placeholder.component.scss',
})
export class LoadingPlaceholderComponent {}
