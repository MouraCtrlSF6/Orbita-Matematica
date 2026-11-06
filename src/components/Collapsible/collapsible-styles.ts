export enum CollapsibleVariant {
  Default = 'default',
  Card = 'card',
  Ghost = 'ghost',
}

export const collapsibleStyles = {
  [CollapsibleVariant.Default]: 'rounded-option border border-selected-border',
  [CollapsibleVariant.Card]: 'rounded-card border border-line bg-white',
  [CollapsibleVariant.Ghost]: 'rounded-option border-0',
};

export const collapsibleContentStyles = {
  [CollapsibleVariant.Default]: 'px-3 pb-3',
  [CollapsibleVariant.Card]: 'px-4 pb-4',
  [CollapsibleVariant.Ghost]: 'px-3 pb-3',
};

export const collapsibleTriggerStyles = {
  [CollapsibleVariant.Default]: 'px-3 py-2',
  [CollapsibleVariant.Card]: 'p-4',
  [CollapsibleVariant.Ghost]: 'px-3 py-2',
};
