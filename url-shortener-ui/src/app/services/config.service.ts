// src/app/services/config.service.ts
import { Injectable } from '@angular/core';

export interface IAppConfig {
	apiBaseUrl: string;
	featureFlagX?: string;
}

@Injectable({
	providedIn: 'root'
})
export class ConfigService {
	private config?: IAppConfig;

	public async loadConfig(): Promise<void> {
		const res = await fetch('/assets/config.json');
		const config = await res.json();
		return this.config = config;
	}

	public get apiBaseUrl(): string {
		return this.config?.apiBaseUrl ?? '';
	}
}
