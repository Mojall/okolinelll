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

const getTariffName = (tariffCode) => {
    const tariffTable = {
        "E1": "ЭКО-1",
        "E2": "ЭКО-2",
        "E3": "ЭКО-3",
        "E4": "ЭКО-4",
        "T1": "ТОП-1",
        "T2": "ТОП-2",
        "T3": "ТОП-3",
        "T4": "ТОП-4",
    };
    return tariffTable[tariffCode] || "Неизвестный тариф";
}

const getTariffDescription = (tariffName) => {
    const tariffDescriptions = {
        E1: {
            title: 'ЭКО-1',
            cpu: '1 ядро',
            ram: '1 ГБ',
            ssd: '15 ГБ',
            ip: '1'
        },
        E2: {
            title: 'ЭКО-2',
            cpu: '2 ядра',
            ram: '4 ГБ',
            ssd: '30 ГБ',
            ip: '1'

        },
        E3: {
            title: 'ЭКО-3',
            cpu: '2 ядра',
            ram: '8 ГБ',
            ssd: '50 ГБ',
            ip: '1'
        },
        E4: {
            title: 'ЭКО-4',
            cpu: '4 ядра',
            ram: '8 ГБ',
            ssd: '80 ГБ',
            ip: '1'
        },
        T1: {
            title: 'ТОП-1',
            cpu: '4 ядра',
            ram: '32 ГБ',
            ssd: '100 ГБ',
            ip: '1'
        },
        T2: {
            title: 'ТОП-2',
            cpu: '8 ядра',
            ram: '32 ГБ',
            ssd: '120 ГБ',
            ip: '1'
        },
        T3: {
            title: 'ТОП-3',
            cpu: '16 ядра',
            ram: '64 ГБ',
            ssd: '150 ГБ',
            ip: '1'
        },
        T4: {
            title: 'ТОП-4',
            cpu: '24 ядра',
            ram: '96 ГБ',
            ssd: '300 ГБ',
            ip: '1'
        },
    };
    const description = tariffDescriptions[tariffName];
    if (description) {
        return description;
    } else {
        return null;
    }
}

export { formatAmount, pluralize, formatDate, formatTableAmount, getTariffName, getTariffDescription };
