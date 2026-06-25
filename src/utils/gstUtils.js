export const determinePlaceOfSupply = (entity, companySettings) => {
  if (!entity) return companySettings?.state_code || '27';

  let entityState = entity.shipping_state_code || entity.state_code || entity.state;

  if (entity.gstin && entity.gstin.length >= 2) {
    entityState = entity.gstin.substring(0, 2);
  }

  return String(entityState || companySettings?.state_code || '27').trim();
};
