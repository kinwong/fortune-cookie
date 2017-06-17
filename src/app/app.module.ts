// Angular2 core modules.
import { NgModule, OnInit, OnDestroy, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

// Core components
import * as Services from '../services';
import { AppComponent } from './app';
import { ALL_ROUTES } from './routes';
import * as Components from '../components';

// import { AngularSplitModule } from 'angular-split';
import { DataTableModule, ButtonModule } from 'primeng/primeng';

 /**
  * Represents the application root module.
  *
  * @export
  * @class AppModule
  */
 @NgModule({
  imports: [
    // Angular 2 modules.
    CommonModule, BrowserModule, FormsModule, HttpModule,
    RouterModule.forRoot(ALL_ROUTES),

    // Application defined modules.
    DataTableModule,
    ButtonModule
    // Components
  ],
  providers: [
    Services.LogService,
    Services.AlertService,
    Services.AuthenticationService,
    Services.PermissionGuard
  ],
  declarations: [
    // App
    Components.AppHeaderComponent,
    // Shared
    // Components.ClockComponent,
    // Pages
    Components.HomePageComponent,
    Components.PageNotFoundComponent,
    Components.LoginPageComponent,
    Components.RegisterPageComponent,
    // shared components
    Components.ExchangeListComponent,
    Components.StrategyListComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
