import { nanoid } from 'nanoid';
import { PrismaClient, UrlMapping } from '../generated/prisma';

const prisma = new PrismaClient();

export class UrlRepository {

	public async getOriginalUrl(shortCode: string): Promise<string | null> {
		const record = await prisma.urlMapping.findUnique({
			where: { shortCode },
			select: { originalUrl: true }
		});
		return record?.originalUrl ?? null;
	}

	public async saveShortUrl(originalUrl: string): Promise<UrlMapping | null> {
		const shortCode = nanoid().slice(0, 8);
		return await prisma.urlMapping.create({
			data: { originalUrl, shortCode }
		});
	}
}
