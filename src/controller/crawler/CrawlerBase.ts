import { think } from 'thinkjs';
import Base from "../../controller/base";
class CrawlerBase extends Base {
    get username() {
        return String(this.post('username'));
    }
    get password() {
        return String(this.post('password'));
    }
    get crawlerCookie() {
        return String(this.post('crawlerCookie'));
    }
}
export default CrawlerBase;
