import { think } from 'thinkjs';
export default class extends think.Controller {
    __before() {
    }
    error = (message: string, errorNo: number = 400, data?: any) => {
        this.json({message, data, code: errorNo});
        this.status = errorNo;
        return false;
    }
}
