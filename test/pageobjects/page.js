import { config } from "../config/wdio.shared.conf";

export default class Page {
    open (path) {
        browser.url(config.baseUrl+path)
    }
}
