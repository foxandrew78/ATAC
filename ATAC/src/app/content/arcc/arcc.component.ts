import { Component, OnInit } from '@angular/core';
import { lorumIpsum } from '../../shared/utilities/text-generator';

@Component({
  selector: 'app-arcc',
  standalone: true,
  imports: [],
  templateUrl: './arcc.component.html',
  styleUrl: './arcc.component.scss',
})
export class ARCCComponent {
  content = lorumIpsum(10);
}
