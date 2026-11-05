export enum TabsVariant {
  Pills = 'pills',
  Underline = 'underline',
}

export const tabStyles = {
  [TabsVariant.Pills]:
    'rounded-control border border-line bg-white data-[state=active]:border-selected-border data-[state=active]:bg-selected data-[state=active]:text-primary-hover',
  [TabsVariant.Underline]:
    'border-0 border-b-2 border-transparent bg-transparent data-[state=active]:border-primary data-[state=active]:text-primary',
};
