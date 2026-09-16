// "YYYY-MM-DD" in the VIEWER'S LOCAL timezone (not UTC) — used to compare
// a stored timestamp (e.g. an order's created_at) against a day the owner
// picked in the custom DatePicker, so "today" means their actual today
// rather than shifting near midnight due to UTC.
export const toLocalDateKey = (value) => {
  const d = new Date(value);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
