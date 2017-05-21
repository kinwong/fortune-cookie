import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Accounts } from 'meteor/accounts-base';
import { LogService } from '../services/log-service';

/**
 * Represents the Kash-Cookie Application.
 *
 * @export
 * @class AppComponent
 */
@Component({
  moduleId: module.id,
  selector: 'kc-app',
  providers: [LogService],
  styleUrls: ['./app.scss'],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.html'
})
export class AppComponent implements OnInit, OnDestroy {
  public environment;


  public moduleId: string;
  private _opened = false;

  constructor(private router: Router, private _logger: LogService) {
    this.moduleId = module.id;
    this.environment = 'Test';
  }
  public ngOnChanges() {
    this._logger.debug('ngOnChanges');
  }
  public ngOnInit(): void {

    // tslint:disable-next-line:no-console
    console.info('ngOnInit');
    this._logger.debug('ngOnInit');
  }
  public ngOnDestroy(): void {
    this._logger.debug('ngOnDestroy');
  }

  private _toggleSidebar() {
    this._opened = !this._opened;
  }
}
