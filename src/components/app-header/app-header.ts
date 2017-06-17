import 'reflect-metadata';
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services';

@Component({
  moduleId: module.id,
   host: {
    class: 
    'navbar navbar-fixed-top navbar-dark bg-inverse'
  },
  selector: 'fc-header',
  styleUrls: ['./app-header.scss'],
  templateUrl: './app-header.html'
})
export class AppHeaderComponent {
  public isLoggedIn: boolean;
  public user: string;
  private open = false;

  constructor(private _router: Router, private _authenticationService: AuthenticationService) {
    this.user = '????';

    this._router.events.subscribe(() => {
      if (this.open) {
        this.toggleOpen();
      }
    });
  }

  private toggleOpen(): void {
    this.open = !this.open;
  }
}
