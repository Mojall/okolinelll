const formatAmount = (amount) => {
    const roundedAmount = Math.round(amount * 100) / 100;
    return roundedAmount.toFixed(2);
};

function pluralize (number, singular, pluralFew, pluralMany) {
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;

    if (lastDigit >= 11 && lastTwoDigits <= 19) {
        return pluralMany;
    } else if (lastDigit === 1) {
        return singular;
    } else if (lastDigit >= 2 && lastDigit <= 4) {
        return pluralFew;
    } else {
        return pluralMany;
    }
}


export { formatAmount, pluralize };
