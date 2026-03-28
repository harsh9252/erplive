import { getSettingsFinancialYears, createSettingsFinancialYear } from './settingsService';
import { buildUnsupportedOperationError, findById } from './apiUtils';

const getFinancialYears = async (params = {}) => getSettingsFinancialYears(params);

const getFinancialYear = async (id) => {
  const response = await getFinancialYears();
  const year = findById(response.data, id);

  if (!year) {
    throw new Error('Financial year not found.');
  }

  return year;
};

const createFinancialYear = async (data) => createSettingsFinancialYear(data);

const updateFinancialYear = async () => {
  throw buildUnsupportedOperationError(
    'The current backend API does not support updating financial years after creation.',
  );
};

const deleteFinancialYear = async () => {
  throw buildUnsupportedOperationError(
    'The current backend API does not support deleting financial years.',
  );
};

export const financialYearService = {
  getFinancialYears,
  getFinancialYear,
  createFinancialYear,
  updateFinancialYear,
  deleteFinancialYear,
};

export default financialYearService;
