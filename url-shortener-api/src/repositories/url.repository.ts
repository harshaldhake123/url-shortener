import { pool } from "../database/db";

export function saveShortUrl(url: string) {
    pool.query('SELECT 1').then((x) => console.log(url + x.rows[0]));
}