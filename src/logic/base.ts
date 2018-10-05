import {think} from "thinkjs";

class Base extends think.Logic {
    error = (message: string, errorNo: number = 400, data?: any) => {
        this.json({message, data, code: errorNo});
        this.status = errorNo;
        return false;
    }

    get validateErrorMessage() {
        for (const key in this.validateErrors) {
            if (this.validateErrors.hasOwnProperty(key)) {
                return this.validateErrors[key];
            }
        }
    }
}

export default Base;
