const formatAmount = (amount) => {
    const roundedAmount = Math.round(amount * 100) / 100;
    return roundedAmount.toFixed(2);
};

function pluralizeCores (count) {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastDigit >= 11 && lastTwoDigits <= 19) {
        return 'ядер';
    } else if (lastDigit === 1) {
        return 'ядро';
    } else if (lastDigit >= 2 && lastDigit <= 4) {
        return 'ядра';
    } else {
        return 'ядер';
    }
}


export { formatAmount, pluralizeCores };
