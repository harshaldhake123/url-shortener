import { urlRepository } from "../di";

export class UrlService {
  private readonly Base62Chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  public convertIdToBase62String(id: number): string {
    if (id <= 0) {
      return '';
    }

    let str = "";
    while (id > 0) {
      const remainder = id % 62;
      id = Math.floor(id / 62);
      str = this.Base62Chars[remainder] + str;
    }
    urlRepository.saveShortUrl(str);

    return str;
  }
}