import { Request, Response } from 'express';
import { ShortenUrlApiRequest } from '../contracts/shorten-url-api-request.interface';
import { urlService } from '../di';

export class UrlController {
	private readonly DomainName = 'https://www.shortUrl.com/';

	public redirectShortCode = async (request: Request, response: Response): Promise<void | Response> => {
		const shortCode = request.params.shortCode;

		try {
			const originalUrl = await urlService.getOriginalUrl(shortCode);

			if (!originalUrl?.trim()) {
				console.warn(`No URL found for shortCode: ${shortCode}`);
				return response.status(404).json({ error: 'No long URL found for the short code' });
			}

			const redirectUrl = this.DomainName + originalUrl;
			response.redirect(301, redirectUrl);
			return;
		} catch (err) {
			console.error(`Error fetching original URL for shortCode: ${shortCode}`, err);
			return response.status(500).json({ error: 'Failed to fetch original URL' });
		}
	};

	public createShortUrl = async (request: Request, response: Response): Promise<void | Response> => {
		const body = request.body as ShortenUrlApiRequest;

		try {
			const result = await urlService.shortenUrl(body.originalUrl);

			if (!result) {
				console.error('Failed to shorten URL:', body.originalUrl);
				return response.status(500).json({ error: 'Failed to shorten URL' });
			}

			return response.status(200).json({
				shortUrl: `${this.DomainName}${result.shortUrl}`,
				originalUrl: body.originalUrl,
				id: result.id,
				createdDateTimeUtc: result.createdDateTimeUtc,
			});
		} catch (err) {
			console.error('Error creating short URL:', err, body.originalUrl);
			return response.status(500).json({ error: 'Internal server error' });
		}
	};

}
