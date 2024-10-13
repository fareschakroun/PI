import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token'); // Supposons que le token est stocké dans le local storage

    if (!token) {
      this.router.navigate(['/auth']);
      return false;
    }

    return true;
  }
}