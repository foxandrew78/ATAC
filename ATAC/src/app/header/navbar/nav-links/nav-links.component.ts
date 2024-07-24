import { Component, input } from '@angular/core';
import { linksList } from '../navbar.model';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-links',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-links.component.html',
  styleUrl: './nav-links.component.scss',
})
export class NavLinksComponent {
  linksList = input.required<linksList[]>();
}
