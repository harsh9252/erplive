export const cleanParams = (params = {}) =>
  Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) =>
        value !== undefined &&
        value !== null &&
        value !== '' &&
        !(Array.isArray(value) && value.length === 0),
    ),
  );

export const normalizeListResponse = (payload = {}) => {
  const data = payload?.data;
  const items = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data?.items)
        ? data.items
        : Array.isArray(data?.rows)
          ? data.rows
          : [];

  const pagination = data?.pagination || payload?.pagination || null;

  return {
    ...payload,
    data: items,
    pagination,
  };
};

export const toNumberOrValue = (value) => {
  if (value === '' || value === null || value === undefined) {
    return null;
  }

  const parsedValue = Number(value);
  return Number.isNaN(parsedValue) ? value : parsedValue;
};

export const toDecimal = (value, fallback = 0) => {
  const parsedValue = Number.parseFloat(value);
  return Number.isFinite(parsedValue) ? parsedValue : fallback;
};

export const findById = (items = [], id) =>
  items.find((item) => String(item?.id) === String(id)) || null;

export const buildUnsupportedOperationError = (message) => {
  const error = new Error(message);
  error.code = 'UNSUPPORTED_OPERATION';
  return error;
};

export const formatDateForAPI = (date) => {
  if (!date || isNaN(new Date(date).getTime())) return null;
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getPaginationParams = (page = 1, limit = 20) => ({
  page,
  limit
});
