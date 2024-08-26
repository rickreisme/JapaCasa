export const formatCEP = (value: string ): string => {
    const cleaned = value.replace(/\D/g, '');

    const formated = cleaned.slice(0, 8);

    if(formated.length === 8){
        return `${formated.slice(0, 5)}-${formated.slice(5)}`;
    }

    return formated;
};