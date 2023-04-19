export const MlProductValidation = (item) => (
    item.id.startsWith('ML') &&
/*     !item.hasOwnProperty('variations_data') && */
/*     item.available_quantity > 10 && */
    item.shipping.logistic_type === 'fulfillment'
)