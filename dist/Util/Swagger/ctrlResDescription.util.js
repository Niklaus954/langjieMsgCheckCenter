"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ctrl_error_enum_1 = require("../../Exception/Bo/ctrl.error.enum");
class CtrlResDescriptionUtil {
    static getDescription(keyArr) {
        let str = '';
        for (let key of keyArr) {
            str += ctrl_error_enum_1.CtrlErrorCode[key] + '-' + ctrl_error_enum_1.CtrlErrorMsg[key];
        }
        return str;
    }
}
exports.CtrlResDescriptionUtil = CtrlResDescriptionUtil;
//# sourceMappingURL=ctrlResDescription.util.js.map