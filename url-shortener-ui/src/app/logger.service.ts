import { Injectable } from '@angular/core';

export abstract class LoggerService {
	abstract log(message: string, ...optionalParams: unknown[]): void;
	abstract error(message: string, ...optionalParams: unknown[]): void;
	abstract warn(message: string, ...optionalParams: unknown[]): void;
}

@Injectable({
	providedIn: 'root'
})
export class ConsoleLoggerService extends LoggerService {
	public log(message: string, ...optionalParams: unknown[]): void {
		console.log(message, ...optionalParams);
	}

	public error(message: string, ...optionalParams: unknown[]): void {
		console.error(message, ...optionalParams);
	}

	public warn(message: string, ...optionalParams: unknown[]): void {
		console.warn(message, ...optionalParams);
	}
}
