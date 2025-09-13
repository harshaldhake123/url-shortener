
import { PoolClient } from 'pg';
import { nanoid } from 'nanoid';
import { pool } from '../database/db';

export const generateShortCodeFromNanoId = (): string => nanoid().slice(0, 8);

export class UrlRepository {
	public async getOriginalUrl(shortCode: string): Promise<string | null> {
		const client = await pool.connect();
		console.log(shortCode);

		try {
			return await client.query('SELECT originalUrl from dbo.tbl_UrlMappings WHERE ShortCode = $1', [shortCode])
				.then(result => (result.rows[0] as { originalurl: string }).originalurl)
				.catch((error: unknown) => {
					console.error(`Error fetching original URL for shortCode: ${shortCode}, error:`, error);
					return null;
				});
		} catch (err) {
			console.error('Error fetching short URL in repository: ', err);
			return null;
		} finally {
			client.release();
		}
	}

	public async saveShortUrl(url: string): Promise<{ shortUrl: string; id: number; createdDateTimeUtc: Date } | null> {
		const client = await pool.connect();
		const createdDateTimeUtc = new Date();

		try {

			return await withTransaction(async (client) => {

				const insertResult = await client.query(
					'INSERT INTO dbo.tbl_UrlMappings (OriginalUrl, CreatedDateTimeUtc) VALUES ($1, $2) RETURNING ID',
					[url, createdDateTimeUtc]
				);

				if (insertResult.rows.length === 0) {
					throw new Error('Failed to insert URL');
				}

				const { id } = insertResult.rows[0] as { id: number };
				const shortCode = generateShortCodeFromNanoId();
				await client.query(
					'UPDATE dbo.tbl_UrlMappings SET ShortCode = $1 WHERE ID = $2',
					[shortCode, id]
				);
				return {
					shortUrl: shortCode,
					id,
					createdDateTimeUtc,
				};
			});

		} catch (err) {
			console.error('Error saving short URL:', err);
			return null;
		} finally {
			client.release();
		}
	}

}
export const withTransaction = async <T>(fn: (client: PoolClient) => Promise<T>): Promise<T> => {
	const client = await pool.connect();

	try {
		await client.query('BEGIN');
		const result = await fn(client);
		await client.query('COMMIT');
		return result;
	} catch (err) {
		await client.query('ROLLBACK');
		throw err;
	} finally {
		client.release();
	}
};
