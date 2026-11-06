export enum RadioGroupVariant {
  Default = 'default',
  Cards = 'cards',
}

export const radioOptionStyles = {
  [RadioGroupVariant.Default]: 'flex min-h-11 items-center gap-3 text-body',
  [RadioGroupVariant.Cards]:
    'flex min-h-13.5 items-center gap-3 rounded-option border border-line bg-white px-4 py-3 text-body has-[[data-state=checked]]:border-selected-border has-[[data-state=checked]]:bg-selected',
};
