import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'manamentschool';
  public sidebarActive: boolean = false;

  onMenuButtonClick(event: Event) {
    this.sidebarActive = !this.sidebarActive;

    event.preventDefault();
  }

  logout(event) {
    event.preventDefault();
    //this.authenticationService.logout();
    //this.router.navigate(['/login']);
  }
}
