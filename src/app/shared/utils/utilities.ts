
export const ROWS = 10;
export const ROWS_PER_PAGE = [10, 20, 50, 100, 200];;
export const KEY = 'id';

export const VISA = 'VISA';
export const MASTERCARD = 'MASTERCARD';
export const NEQUI = 'NEQUI';
export const BANCOLOMBIA = 'BANCOLOMBIA';
export const DAVIPLATA = 'DAVIPLATA';
export const PSE = 'PSE';

export const VISA_IMG = '../assets/payment-methods/logo-visa.png';
export const MASTERCARD_IMG = '../assets/payment-methods/logo-mastercard.png';
export const NEQUI_IMG = '../assets/payment-methods/logo-nequi.png';
export const BANCOLOMBIA_IMG = '../assets/payment-methods/logo-bancolombia.png';
export const DAVIPLATA_IMG = '../assets/payment-methods/logo-daviplata.png';
export const PSE_IMG = '../assets/payment-methods/logo-pse.png';
export const DEFAULT_IMG_PAYMENT_METHOD = '../assets/payment-methods/logo-default.png';


export const getImage = (paymentMethod: any) => {
    switch (paymentMethod?.toUpperCase()) {
      case VISA:
        return VISA_IMG;
      case MASTERCARD:
        return MASTERCARD_IMG;
      case NEQUI:
        return NEQUI_IMG;
      case BANCOLOMBIA:
        return BANCOLOMBIA_IMG;
      case DAVIPLATA:
        return DAVIPLATA_IMG;
      case PSE:
        return PSE_IMG;
      default:
        return DEFAULT_IMG_PAYMENT_METHOD;
    }
  }

  export const isSameDay = (date1: Date, date2: Date): boolean => {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  }
