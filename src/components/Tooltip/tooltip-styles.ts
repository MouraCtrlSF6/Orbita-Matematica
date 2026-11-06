export enum TooltipVariant {
  Default = 'default',
  Light = 'light',
  Flight = 'flight',
}

export const tooltipStyles = {
  [TooltipVariant.Default]: 'border-ink bg-ink text-white',
  [TooltipVariant.Light]: 'border-line bg-white text-ink',
  [TooltipVariant.Flight]: 'border-flight-secondary-border bg-flight-panel text-flight-ink',
};

export const tooltipArrowStyles = {
  [TooltipVariant.Default]: 'fill-ink',
  [TooltipVariant.Light]: 'fill-white',
  [TooltipVariant.Flight]: 'fill-flight-panel',
};
