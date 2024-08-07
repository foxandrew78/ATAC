import { Component, input } from '@angular/core';

@Component({
  selector: 'app-atac-detail',
  standalone: true,
  imports: [],
  templateUrl: './atac-detail.component.html',
  styleUrl: './atac-detail.component.scss',
})
export class AtacDetailComponent {
  id = input<string>();

  ngOnInit() {
    console.log(this.id());
  }
}
