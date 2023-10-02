
const GetWordEnding = (num) => {
    const lastDigit = num % 10;
    if (num >= 5 && num <= 9 || num === 0 || (num >= 11 && num <= 19)) {
        return 'чоловіків';
    } else if (lastDigit === 1) {
        return 'чоловік';
    } else if (lastDigit >= 2 && lastDigit <= 4) {
        return 'чоловіка';
    } else {
        return 'чоловіків';
    }
};

export default GetWordEnding;
