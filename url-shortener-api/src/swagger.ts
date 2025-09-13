import swaggerJSDoc from 'swagger-jsdoc';
import { SwaggerOptions } from 'swagger-ui-express';

const options: SwaggerOptions = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'URL Shortener API',
			version: '1.0.0',
			description: 'URL Shortener Express API',
		},
	},
	apis: ['./routes/url-routes.ts'],
};
export const specs = swaggerJSDoc(options);