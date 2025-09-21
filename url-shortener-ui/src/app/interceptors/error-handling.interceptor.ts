import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse, HttpEvent, HttpRequest, HttpHandlerFn, HttpStatusCode } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { LoggerService } from '../logger.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';

const handleUnauthorized = (snackbar: SnackbarService, router: Router) => {
	snackbar.show('Unauthorized access. Redirecting to home.');
	router.navigate(['/home'], { replaceUrl: true });
};

const handleServerError = (snackbar: SnackbarService) => {
	snackbar.show('A server error occurred. Please try again later.');
};

const handleClientError = (snackbar: SnackbarService, message: string | undefined) => {
	const displayMessage = message ?? 'Request failed. Please check and try again.';
	snackbar.show(displayMessage);
};

export const errorHandlingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
	const logger = inject(LoggerService);
	const router = inject(Router);
	const snackbar = inject(SnackbarService);

	const logError = (error: HttpErrorResponse): void => {
		logger.error(
			`HTTP Error - Method: ${req.method} URL: ${req.url} Status: ${error.status} ${error.statusText}`,
			'Message:', error.message,
			'Full error:', error
		);
	};

	return next(req).pipe(
		catchError((error: HttpErrorResponse) => {
			logError(error);
			if (error.status === HttpStatusCode.Unauthorized) {
				handleUnauthorized(snackbar, router);
			} else if (error.status >= HttpStatusCode.InternalServerError) {
				handleServerError(snackbar);
			} else if (error.status >= 400 && error.status < 500) {
				handleClientError(snackbar, error.message);
			}

			return throwError(() => error);
		})
	);
};
