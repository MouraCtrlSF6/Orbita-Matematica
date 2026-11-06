interface QuestionDescriptionProps {
  creating: boolean;
}

export function QuestionDescription({ creating }: QuestionDescriptionProps) {
  return (
    <p>
      {creating
        ? 'Preencha os campos para adicionar uma questão à sala. Ela estará disponível para os alunos na próxima entrada.'
        : 'Consulte e organize as questões da sala. As alterações valem na próxima entrada dos alunos; quem já está jogando mantém as questões carregadas.'}
    </p>
  );
}
