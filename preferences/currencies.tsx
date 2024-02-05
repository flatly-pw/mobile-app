import Currency from "../types/Currency";

type Currencies = {
  [key in Currency]: {
    sign: string;
    USDtoCurrency: number;
  };
};

// TODO: fetch USDtoCurrency from backend (currently endpoint not implemented)
export const currencies: Currencies = {
  USD: {
    sign: "$",
    USDtoCurrency: 1,
  },
  EUR: {
    sign: "€",
    USDtoCurrency: 0.92,
  },
  PLN: {
    sign: "zł",
    USDtoCurrency: 4.05,
  },
};

const getPriceWithCurrency = (price: number, currency: Currency, accuracy: number = 2) => {
  if (["USD"].includes(currency)) {
    return (
      currencies[currency].sign +
      (price * currencies[currency].USDtoCurrency).toFixed(accuracy).toString()
    );
  } else if (["EUR", "PLN"].includes(currency)) {
    return (
      (price * currencies[currency].USDtoCurrency).toFixed(accuracy).toString() +
      currencies[currency].sign
    );
  }
  console.error("Problem in getPriceWithCurrency, price:", price, "currency:", currency);
  return "Invalid price!";
};

export default getPriceWithCurrency;
