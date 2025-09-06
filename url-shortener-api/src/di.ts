import { UrlRepository } from "./repositories/url.repository";
import { UrlService } from "./services/url.service";
import { UrlController } from "./controllers/url-controller";

const urlRepository = new UrlRepository();
const urlService = new UrlService();
const urlController = new UrlController();

export { urlController, urlService, urlRepository };
