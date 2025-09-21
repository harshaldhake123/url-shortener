import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ShortenUrlApiRequest {
	originalUrl: string;
}
export interface ShortenUrlApiResponse {
	shortUrl: string,
	originalUrl: string,
	id: number,
	createdOnUtc: Date,
};


@Injectable({
	providedIn: 'root'
})
export class UrlApiService {
	private readonly httpClient = inject(HttpClient);

	public saveShortUrl(request: ShortenUrlApiRequest): Observable<HttpResponse<ShortenUrlApiResponse>> {
		return this.httpClient.post<ShortenUrlApiResponse>('/shorten', request, { observe: 'response' });
	}
}
