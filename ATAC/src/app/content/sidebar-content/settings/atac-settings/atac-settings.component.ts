import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-atac-settings',
  standalone: true,
  imports: [MatSlideToggleModule, ReactiveFormsModule, FormsModule],
  templateUrl: './atac-settings.component.html',
  styleUrl: './atac-settings.component.scss',
})
export class AtacSettingsComponent {
  checked: boolean = true;
  formGroup = new FormGroup({
    enableClosed: new FormControl(false),
  });

  onShowClosedToggle() {
    console.log(this.formGroup.controls.enableClosed.value);
  }
}
