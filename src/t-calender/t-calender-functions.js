
export const getFullMonth = (d) => {
    const firstDay = d.day();
    const month = [];
    let temp = [];

    for (let index = 0; index < firstDay; index++) {
        temp.push('');
    }
    let count = 0
    while (temp.length < 7) {
        temp.push(count + 1);
        count++;
    }
    month.push(temp);
    temp = []

    for (let index = count; index < d.daysInMonth(); index++) {
        temp.push(index + 1);
        if (temp.length === 7) {
            month.push(temp);
            temp = []
        }
    }
    while (temp.length < 7) {
        temp.push('')
    }
    if (temp.length > 0) {
        month.push(temp);
    }
    return month;
}

export const generateDecade = (low, high) => {
    const decades = []
    let temp = []
    for (let index = low; index <= high; index++) {
        temp.push(index);
        if (temp.length === 4) {
            decades.push(temp);
            temp = []
        }
    }

    if (temp.length > 0) {
        decades.push(temp);
    }
    return decades;
}
