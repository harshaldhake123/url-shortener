import { Request, Response } from 'express';
import { ShortenUrlApiRequest } from '../contracts/shorten-url-api-request.interface';
import { urlService } from '../di';

export class UrlController {
	private readonly DomainName = 'https://www.shortUrl.com/';

	public redirectShortCode = async (request: Request, response: Response) => await urlService.getOriginalUrl(request.params.shortCode)
		.then(originalUrl => {
			console.log(originalUrl);

			if (originalUrl === null || originalUrl.trim().length === 0) {
				return response.status(404).json({ error: 'No long url found for the short code' });
			}
			response.redirect(301, this.DomainName + originalUrl);
		})
		.catch(() => response.status(500).json({ error: 'failed to fetch original url' }));

	public createShortUrl = async (request: Request, response: Response) => {

		const body = request.body as ShortenUrlApiRequest;

		return await urlService.shortenUrl(body.originalUrl)
			.then(result => {
				if (result === null) {

					return response.status(500).json({ error: 'Failed to shorten url' });
				}

				return response.status(200).json({
					shortUrl: this.DomainName.concat(result.shortUrl),
					originalUrl: body.originalUrl,
					id: result.id,
					createdOnUtc: result.createdDateTimeUtc,
				});
			});
	};
}
