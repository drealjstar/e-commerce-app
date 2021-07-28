export const reduceTotalLength = (str, num) => {
    if (str.length > num) {
        let subStr = str.substring(0, num);
        return subStr;
    } else {
        return Number(str);
    }
};