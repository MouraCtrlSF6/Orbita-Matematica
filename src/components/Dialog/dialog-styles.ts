export enum DialogVariant {
  Default = 'default',
  Wide = 'wide',
}

export const dialogWidths = {
  [DialogVariant.Default]: 'max-w-130',
  [DialogVariant.Wide]: 'max-w-200',
};
