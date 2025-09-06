import { saveShortUrl } from "../repositories/url.repository.js";

const base62Chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export function convertIdToBase62String(id) {
  if (id <= 0) return null;

  let str = "";
  while (id > 0) {
    const remainder = id % 62;
    id = Math.floor(id / 62);
    str = base62Chars[remainder] + str;
  }
  saveShortUrl(str);
  return str;
}

