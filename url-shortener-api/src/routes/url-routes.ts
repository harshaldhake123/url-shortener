import express, { Router } from 'express';
import { CorsOptions } from 'cors';
import cors from 'cors';
import { urlController } from '../di';

export class UrlRoutes {
	public router: Router;
	private redirectCorsOptions: CorsOptions = {
		origin: '*'
	};

	constructor() {
		this.router = express.Router();
		this.registerRoutes();
	}

	private registerRoutes(): void {
		this.router.post(
			'/shorten',
			cors(this.redirectCorsOptions),
			urlController.createShortUrl
		);
		this.router.get('/:shortCode', urlController.redirectShortCode);
	}
}
