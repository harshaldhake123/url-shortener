import { convertIdToBase62String } from "../services/url.service.js";

export const shorten = (request, response) => {
    const body = request.body;
    const id = 1234567890;
    const result = convertIdToBase62String(id);
    response.send({
        shortUrl: "www.shortUrl.com/" + result,
        originalUrl: body.longUrl,
        id: id,
        createdOnUtc: Date.now(),
    });
};

export const getLongUrl = (_request, response) => {
    response.send("Long url");
};
