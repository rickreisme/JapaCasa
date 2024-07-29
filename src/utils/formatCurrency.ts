const formatCurrency = (value:  number) => {
    return value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'BRL'
    })
};

export default formatCurrency;