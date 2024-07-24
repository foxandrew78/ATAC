import { Component } from '@angular/core';
import { IntcIconComponent } from './intc-icon/intc-icon.component';
import { SarNetIconComponent } from './sar-net-icon/sar-net-icon.component';

@Component({
  selector: 'app-branding-bar',
  standalone: true,
  imports: [IntcIconComponent, SarNetIconComponent],
  templateUrl: './branding-bar.component.html',
  styleUrl: './branding-bar.component.scss',
})
export class BrandingBarComponent {}
