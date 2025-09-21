import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export type SnackbarType = 'info' | 'success' | 'warning' | 'error';

@Injectable({
	providedIn: 'root'
})
export class SnackbarService {
	private readonly defaultDuration = 3000;
	private readonly snackBar: MatSnackBar;

	constructor() {
		this.snackBar = inject(MatSnackBar);
	}

	public show(message: string): void {
		this.snackBar.open(message, 'Close', { duration: this.defaultDuration });
	}
}
