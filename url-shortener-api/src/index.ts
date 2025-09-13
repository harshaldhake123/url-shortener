import express from 'express';
import rateLimit from 'express-rate-limit';
import { UrlRoutes } from './routes/url-routes';

const app = express();
const port = 3000;

app.use(express.json());
const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // in milliseconds, 15 minutes
	max: 50, // Limit each IP to 100 requests per 15 minutes
	message: 'Too many requests from this IP, please try again after 15 minutes.',
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
});

app.use(apiLimiter);
app.use('/', new UrlRoutes().router);

app.listen(port, () => {
	console.log('Server listening on port', port);
});
