/* eslint-disable @typescript-eslint/no-floating-promises */
import { pool } from "../database/db";

export class UrlRepository {
    public saveShortUrl(url: string): void {
        pool.query('SELECT 1').then((x) => {
            console.log(x.rows[0]);
            console.log(url);

            return 1;
        });
    }

    public getUniqueId(originalUrl: string): number {
        //pool.query('INSERT INTO dbo.tbl_UrlMappings()');
        console.log(originalUrl);

        return 123456;
    }
}