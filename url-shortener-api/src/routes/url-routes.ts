import express, { Router } from 'express';
import { urlController } from '../di';

export class UrlRoutes {
	public router: Router;

	constructor() {
		this.router = express.Router();
		this.registerRoutes();
	}

	private registerRoutes(): void {
		this.router.post('/shorten', urlController.createShortUrl);
		this.router.get('/:shortCode', urlController.redirectShortCode);
	}
}
