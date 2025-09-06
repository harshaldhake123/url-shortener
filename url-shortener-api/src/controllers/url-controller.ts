import { Request, Response } from "express";
import { ShortenUrlApiRequest } from "../contracts/shorten-url-api-request.interface";
import { urlRepository, urlService } from "../di";

export class UrlController {

    public shorten = (request: Request, response: Response) => {

        const body = request.body as ShortenUrlApiRequest;

        const uniqueId = urlRepository.getUniqueId(body.originalUrl);
        const result = urlService.convertIdToBase62String(uniqueId);
        response.send({
            shortUrl: "www.shortUrl.com/".concat(result),
            originalUrl: body.originalUrl,
            id: uniqueId,
            createdOnUtc: Date.now(),
        });
    };
}
