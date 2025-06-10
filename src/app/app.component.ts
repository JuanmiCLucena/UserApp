import { Component } from '@angular/core';
import { UserAppComponent } from './components/user-app.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [UserAppComponent, RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = '6-user-app';
}
