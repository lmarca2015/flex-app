import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public router: Router){

  }

  canActivate(): boolean {

    // if (sessionStorage.getItem('id') == null) {
    //     this.router.navigate(['login']);
    //     return false;
    // }
    this.router.navigate(['login']);
    return false;
}
  
}
