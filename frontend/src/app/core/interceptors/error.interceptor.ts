import { Injectable, inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private router = inject(Router);
  private messageService = inject(MessageService);
  private authService = inject(AuthService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocurrió un error inesperado';

        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          switch (error.status) {
            case 0:
              errorMessage = 'No se pudo conectar con el servidor';
              break;
            case 400:
              errorMessage = error.error?.message || 'Solicitud inválida';
              break;
            case 401:
              errorMessage = 'No autorizado. Por favor inicia sesión nuevamente';
              this.authService.logoutLocal();
              break;
            case 403:
              errorMessage = 'No tienes permisos para realizar esta acción';
              this.router.navigate(['/error/forbidden']);
              break;
            case 404:
              errorMessage = error.error?.message || 'Recurso no encontrado';
              break;
            case 409:
              errorMessage = error.error?.message || 'El recurso ya existe';
              break;
            case 422:
              errorMessage = error.error?.message || 'Datos de validación incorrectos';
              break;
            case 500:
              errorMessage = 'Error interno del servidor';
              break;
            case 503:
              errorMessage = 'Servicio no disponible temporalmente';
              break;
            default:
              errorMessage = error.error?.message || `Error: ${error.status}`;
          }
        }

        if (error.status !== 401) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: errorMessage,
            life: 5000,
          });
        }

        console.error('HTTP Error:', {
          status: error.status,
          message: errorMessage,
          error: error.error,
        });

        return throwError(() => error);
      })
    );
  }
}
