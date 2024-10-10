import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PrincipalLandingComponent } from './landing/principal-landing/principal-landing.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,PrincipalLandingComponent,FooterComponent,HeaderComponent,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CheeseRUN';
}
