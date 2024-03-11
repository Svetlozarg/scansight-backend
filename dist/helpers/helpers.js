"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonthNameInBulgarian = exports.getMonthName = void 0;
const getMonthName = (monthNumber) => {
    switch (monthNumber) {
        case 1:
            return "january";
        case 2:
            return "february";
        case 3:
            return "march";
        case 4:
            return "april";
        case 5:
            return "may";
        case 6:
            return "june";
        case 7:
            return "july";
        case 8:
            return "august";
        case 9:
            return "september";
        case 10:
            return "october";
        case 11:
            return "november";
        case 12:
            return "december";
        default:
            return "";
    }
};
exports.getMonthName = getMonthName;
const getMonthNameInBulgarian = (monthNumber) => {
    switch (monthNumber) {
        case 1:
            return "Януари";
        case 2:
            return "Февруари";
        case 3:
            return "Март";
        case 4:
            return "Април";
        case 5:
            return "Май";
        case 6:
            return "Юни";
        case 7:
            return "Юли";
        case 8:
            return "Август";
        case 9:
            return "Септември";
        case 10:
            return "Октомври";
        case 11:
            return "Ноември";
        case 12:
            return "Декември";
        default:
            return "";
    }
};
exports.getMonthNameInBulgarian = getMonthNameInBulgarian;
//# sourceMappingURL=helpers.js.map