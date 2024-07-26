import { Component } from '@angular/core';
import { lorumIpsum } from '../../shared/utilities/text-generator';

@Component({
  selector: 'app-passdown',
  standalone: true,
  imports: [],
  templateUrl: './passdown.component.html',
  styleUrl: './passdown.component.scss',
})
export class PassdownComponent {
  content = lorumIpsum(3);
}
