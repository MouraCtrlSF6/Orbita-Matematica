export enum AccordionVariant {
  Default = 'default',
  Card = 'card',
  Ghost = 'ghost',
  Flight = 'flight',
}

export const accordionItemStyles = {
  [AccordionVariant.Default]: 'rounded-option border border-selected-border bg-white',
  [AccordionVariant.Card]: 'rounded-card border border-line bg-white',
  [AccordionVariant.Ghost]: 'border-0 border-b border-line',
  [AccordionVariant.Flight]: 'rounded-option border border-flight-secondary-border bg-flight-panel',
};

export const accordionTriggerStyles = {
  [AccordionVariant.Default]:
    'rounded-option px-3 py-3 text-ink hover:bg-selected data-[state=open]:bg-selected',
  [AccordionVariant.Card]:
    'rounded-card p-4 text-ink hover:bg-selected data-[state=open]:bg-selected',
  [AccordionVariant.Ghost]: 'px-3 py-3 text-ink hover:bg-selected',
  [AccordionVariant.Flight]:
    'rounded-option px-3 py-3 text-flight-ink hover:bg-flight-secondary data-[state=open]:bg-flight-secondary focus-visible:outline-flight-focus',
};

export const accordionContentStyles = {
  [AccordionVariant.Default]: 'px-3 py-3 text-ink',
  [AccordionVariant.Card]: 'p-4 text-ink',
  [AccordionVariant.Ghost]: 'px-3 py-3 text-ink',
  [AccordionVariant.Flight]: 'px-3 py-3 text-flight-ink',
};
