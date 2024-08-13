import { Component, EventEmitter, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { AtacService } from '../../../../shared/services/atac.service';

@Component({
  selector: 'app-atac-settings',
  standalone: true,
  imports: [MatSlideToggleModule, ReactiveFormsModule, FormsModule],
  templateUrl: './atac-settings.component.html',
  styleUrl: './atac-settings.component.scss',
})
export class AtacSettingsComponent {
  private atacService = inject(AtacService);

  formGroup = new FormGroup({
    enableClosed: this.atacService.showClosedToggleSwitch,
  });

  onShowClosedToggle(event: MatSlideToggleChange) {
    switch (event.checked) {
      case true:
        this.atacService.getClosed.set(true);
        this.atacService.loadAtacs('closed');
        break;
      case false:
        this.atacService.getClosed.set(false);
        this.atacService.loadAtacs('open');
        break;
      default:
        break;
    }
  }
}
