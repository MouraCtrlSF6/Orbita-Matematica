export enum ToastVariant {
  Default = 'default',
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Flight = 'flight',
}

export const toastStyles = {
  [ToastVariant.Default]: 'border-line bg-white text-ink',
  [ToastVariant.Success]: 'border-success-border bg-success text-success-ink',
  [ToastVariant.Error]: 'border-danger bg-white text-danger',
  [ToastVariant.Warning]: 'border-peach bg-retry text-peach-ink',
  [ToastVariant.Flight]:
    'border-flight-secondary-border bg-flight-panel text-flight-ink focus-visible:outline-flight-focus',
};
