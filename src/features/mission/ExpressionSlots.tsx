export interface ExpressionSlotsProps {
  answer: string;
}

export function ExpressionSlots({ answer }: ExpressionSlotsProps) {
  return (
    <div
      className="expression-slots p-5 [background:#f9f7fc] [border:0.125rem_dashed_#d2c5e3] rounded-soft min-h-18 flex items-center justify-center text-[#71607e] text-dialog-body tracking-[0.125rem]"
      aria-live="polite"
    >
      {answer || 'Sua expressão aparece aqui'}
    </div>
  );
}
