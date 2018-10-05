import {think} from "thinkjs";
import Base from "../base";

class CrawlerBase extends Base {
    __before() {
        if (this.method && this.method.toLowerCase() !== 'post') {
            return this.error('METHOD NOT ALLOWED,PLEASE USE POST ：）', 405);
        }
    }
}

export default CrawlerBase;
