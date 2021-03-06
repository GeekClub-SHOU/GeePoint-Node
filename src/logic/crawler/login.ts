import {think} from "thinkjs";
import CrawlerBase from "./CrawlerBase";
export default class extends CrawlerBase {
    indexAction() {
        const rules = {
            username: {string: true, required: true, aliasName: '用户名'},
            password: {string: true, required: true, aliasName: '密码'},
        };
        const messages = {
            username: {
                required: '您未输入您的学号',
                string: '学号格式错误，请输入字符串'
            },
            password: {
                required: '您未输入您的密码',
                string: '密码格式错误，请输入字符串'
            }
        };
        const flag = this.validate(rules, messages);
        if (!flag) {
            return this.error(this.validateErrorMessage, 400, this.validateErrors);
        }
    }
}
