const localeMap = { en: "en-US", sk: "sk-SK" };

export const formatPrice = (amount, currency = "EUR", language = "en") =>
  new Intl.NumberFormat(localeMap[language] ?? "en-US", {
    style: "currency",
    currency,
  }).format(amount);
