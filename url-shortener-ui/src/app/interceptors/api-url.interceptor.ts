import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ConfigService } from '../services/config.service';

export const apiUrlInterceptor: HttpInterceptorFn = (req, next) => {
	const configService = inject(ConfigService);
	const apiReq = req.clone({ url: `${configService.apiBaseUrl}${req.url.startsWith('/') ? '' : '/'}${req.url}` });
	return next(apiReq);
};
