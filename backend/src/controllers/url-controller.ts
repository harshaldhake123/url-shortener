import type { Request, Response } from "express";

export const getShortenedUrl = (_request: Request, response: Response): void => {
    response.send('shortened url');
};