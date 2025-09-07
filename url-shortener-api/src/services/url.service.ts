import { urlRepository } from "../di";

export class UrlService {

  public async shortenUrl(originalUrl: string): Promise<{ shortUrl: string, id: number, createdDateTimeUtc: Date } | null> {
    return await urlRepository.saveShortUrl(originalUrl);
  }
}