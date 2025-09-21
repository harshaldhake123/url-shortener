import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const apiUrlInterceptor: HttpInterceptorFn = (req, next) => {
	const apiReq = req.clone({ url: `${environment.apiBaseUrl}${req.url.startsWith('/') ? '' : '/'}${req.url}` });
	return next(apiReq);
};
