export enum CheckboxVariant {
  Default = 'default',
  Card = 'card',
}

export const checkboxLabelStyles = {
  [CheckboxVariant.Default]: '',
  [CheckboxVariant.Card]:
    'rounded-option border border-line bg-white px-4 py-3 has-[[data-state=checked]]:border-selected-border has-[[data-state=checked]]:bg-selected',
};
