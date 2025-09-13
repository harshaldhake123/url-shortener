import { urlRepository } from '../di';

export class UrlService {

	public async getOriginalUrl(shortCode: string): Promise<string | null> {
		const result = await urlRepository.getOriginalUrl(shortCode);
		console.log('Service returning:', result);
		return result;
	}

	public async shortenUrl(originalUrl: string): Promise<{ shortUrl: string, id: number, createdDateTimeUtc: Date } | null> {
		return await urlRepository.saveShortUrl(originalUrl);
	}
}