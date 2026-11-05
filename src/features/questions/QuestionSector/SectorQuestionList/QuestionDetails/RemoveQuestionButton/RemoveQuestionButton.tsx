interface RemoveQuestionButtonProps {
  id: string;
  title: string;
  pending: boolean;
  remove: (id: string) => void;
}

export function RemoveQuestionButton({ id, title, pending, remove }: RemoveQuestionButtonProps) {
  return (
    <button type="button" disabled={pending} onClick={() => remove(id)}>
      Excluir questão {title}
    </button>
  );
}
