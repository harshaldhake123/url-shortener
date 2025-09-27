import { urlRepository } from '../di';
import { ShortUrl } from '../models/shorturl.interface';

export class UrlService {

	public async getOriginalUrl(shortCode: string): Promise<string | null> {
		const result = await urlRepository.getOriginalUrl(shortCode);
		console.log('Service returning:', result);
		return result;
	}

	public async shortenUrl(originalUrl: string): Promise<ShortUrl | null> {
		const repoResponse = await urlRepository.saveShortUrl(originalUrl);

		if (!repoResponse?.id || !repoResponse.shortCode) {
			console.error('Failed to save short URL:', repoResponse);
			return null;
		}

		return {
			id: repoResponse.id,
			shortUrl: repoResponse.shortCode,
			createdDateTimeUtc: repoResponse.createdDateTimeUtc,
		};
	}
}

