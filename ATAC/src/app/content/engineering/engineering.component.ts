import { Component } from '@angular/core';
import { lorumIpsum } from '../../shared/utilities/text-generator';

@Component({
  selector: 'app-engineering',
  standalone: true,
  imports: [],
  templateUrl: './engineering.component.html',
  styleUrl: './engineering.component.scss',
})
export class EngineeringComponent {
  content = lorumIpsum(50);
}
