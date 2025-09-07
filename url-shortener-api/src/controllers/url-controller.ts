import { Request, Response } from "express";
import { ShortenUrlApiRequest } from "../contracts/shorten-url-api-request.interface";
import { urlService } from "../di";

export class UrlController {
    private readonly DomainName = "www.shortUrl.com/";

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
