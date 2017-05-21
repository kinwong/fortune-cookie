import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LogService, AlertService, AuthenticationService } from '../../services';

@Component({
  moduleId: module.id,
  selector: 'login-page',
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.scss']
})
export class LoginPageComponent implements OnInit {
  public model: any = {};
  public loading = false;
  private returnUrl: string;

  constructor(
    private _logger: LogService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _authenticationService: AuthenticationService,
    private _alertService: AlertService) { }

  public ngOnInit(): void {
    // reset login status
    this._authenticationService.logout();
    // get return url from route parameters or default to '/'
  }

  public login() {
    this._logger.info('login');
    this.loading = true;
    this._authenticationService.login(this.model.username, this.model.password)
      .subscribe(
      _ => {
        this._router.navigate([this.returnUrl]);
      },
      error => {
        this._alertService.error(error);
        this.loading = false;
      },
      () => {
        this.loading = false;
      });
  }
}
