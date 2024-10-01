const addPeriods = (num: string) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export const toPrice = (num: number, precision?: number) => {
    const price = Number(num).toFixed(precision);

    return addPeriods(price);
};
