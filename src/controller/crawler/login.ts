import Base from '../base.js';
import {URPCrawler} from '../../utils/URPCrawler';
import CrawlerBase from "./CrawlerBase";
import ClientError from "../../utils/ClientError";

export default class extends CrawlerBase {
    async indexAction() {
        try {
            const urpCrawler = new URPCrawler();
            await urpCrawler.login(this.username, this.password);
            return this.json({
                crawlerCookie: urpCrawler.cookie
            });
        } catch (e) {
            if ( e instanceof ClientError) {
                return this.error(e.message, e.status);
            } else {
                return this.error(e.message, 500);
            }
        }
    }
}
