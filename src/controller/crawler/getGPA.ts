import Base from '../base.js';
import {URPCrawler} from '../../utils/URPCrawler';
import CrawlerBase from "./CrawlerBase";
import ClientError from "../../utils/ClientError";

export default class extends CrawlerBase {
    async indexAction() {
        try {
            const urpCrawler = new URPCrawler();
            urpCrawler.cookie = this.crawlerCookie;
            console.log(urpCrawler.cookie);
            // await urpCrawler.login(this.username, this.password);
            const response = await urpCrawler.request('/main/academicInfo?flag=');
            return this.json(JSON.parse(response.text));
        } catch (e) {
            if ( e instanceof ClientError) {
                return this.error(e.message, e.status);
            } else if (e.message.indexOf('in JSON') >= 0) {
                return this.error('您的登录已过期', 403);
            } else {
                return this.error(e.message, 500);
            }
        }
    }
}
