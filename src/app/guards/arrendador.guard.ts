import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class ArrendadorGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): boolean {
        const userType = this.authService.getUserType();
        if (userType === 'arrendador') {
            return true;
        }
        this.router.navigate(['/login']); // Redirigir si no es arrendador
        return false;
    }
}
