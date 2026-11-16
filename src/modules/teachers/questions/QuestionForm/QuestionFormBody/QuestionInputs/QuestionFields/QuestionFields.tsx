import { FormField } from '../FormField/FormField';

export function QuestionFields() {
  return (
    <>
      <FormField name="title" label="Título" />
      <FormField name="prompt" label="Enunciado" multiline />
      <div className="grid grid-cols-2 items-start gap-4 ds-down-mobile:grid-cols-1">
        <FormField
          name="objective"
          label="Objetivo"
          optional
          description="O objetivo da questão será apresentado ao aluno como um pequeno balão roxo acima do enunciado."
        />
        <FormField
          name="skill"
          label="Habilidade"
          optional
          description="Informe a habilidade da BNCC contemplada por esta questão."
        />
      </div>
    </>
  );
}
