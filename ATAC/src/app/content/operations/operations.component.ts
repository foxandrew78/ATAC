import { Component } from '@angular/core';
import { lorumIpsum } from '../../shared/utilities/text-generator';

@Component({
  selector: 'app-operations',
  standalone: true,
  imports: [],
  templateUrl: './operations.component.html',
  styleUrl: './operations.component.scss',
})
export class OperationsComponent {
  content = lorumIpsum();
}
