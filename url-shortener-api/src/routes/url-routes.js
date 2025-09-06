import express from 'express';
import { getShortenedUrl } from '../controllers/url-controller.js';

export const router = express.Router();

router.get('/shorten', getShortenedUrl);

