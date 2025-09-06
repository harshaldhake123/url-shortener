import { pool } from "../database/db.js";

export function saveShortUrl(url) {
    pool.query('SELECT 1').then(x => console.log(x.rows[0]));
}