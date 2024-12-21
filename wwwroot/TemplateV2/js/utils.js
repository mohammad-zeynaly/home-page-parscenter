const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
function convertToPersianNumbers(str) {
    if (typeof str !== 'string') {
        str = str.toString();
    }
    if (persianNumbers) {
        for (let i = 0; i < persianNumbers.length; i++) {
            str = str.replace(new RegExp(i, 'g'), persianNumbers[i]);
        }
    }
    return str;
}
