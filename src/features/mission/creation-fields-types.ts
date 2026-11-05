export interface CreationFieldsProps {
  context: string;
  variable: number;
  disabled: boolean;
  onContextChange: (value: string) => void;
  onVariableChange: (value: number) => void;
}

export interface SelectOption {
  value: string | number;
  label: string;
}
