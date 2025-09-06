import { Request, Response } from "express";
import { convertIdToBase62String } from "../services/url.service";

export const shorten = (request: Request, response: Response) => {
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

export const getLongUrl = (_request: Request, response: Response) => {
    response.send("Long url");
};
