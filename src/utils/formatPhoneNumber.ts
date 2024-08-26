export const formatPhoneNumber = (value: string): string => {

    const cleaned = value.replace(/\D/g, '');


    if (cleaned.length <= 2) {
        return cleaned;
    } else if (cleaned.length <= 7) {
        return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    } else if (cleaned.length <= 11) {
        return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`; // (XX) XXXXX-XXXX
    } else {
        return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`; // 11 dígitos
    }
};