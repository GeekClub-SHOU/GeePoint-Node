import {think} from "thinkjs";
import CrawlerBase from "./CrawlerBase";
export default class extends CrawlerBase {
    indexAction() {
        const rules = {
            crawlerCookie: {string: true, required: true, aliasName: 'crawlerCookie'},
        };
        const messages = {
            crawlerCookie: {
                required: '请登录后操作',
                string: ' Cookie格式错误，请输入字符串'
            }
        };
        const flag = this.validate(rules, messages);
        if (!flag) {
            return this.error(this.validateErrorMessage, 400, this.validateErrors);
        }
    }
}
