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

const formatDate = (column) => {
    const dateString = column.date;
    const date = new Date(dateString);
    const option = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
    };
    return new Intl.DateTimeFormat('ru-RU', option).format(date);
};

const formatTableAmount = (column) => {
    const amount = parseFloat(column.amount);
    return amount.toFixed(2);
};

export { formatAmount, pluralize, formatDate, formatTableAmount };
