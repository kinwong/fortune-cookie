// logged-in.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication-service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  public canActivate(): boolean {
    if (!this.authenticationService.isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
