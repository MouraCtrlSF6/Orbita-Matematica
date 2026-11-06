import { VisualFields } from './VisualFields/VisualFields';
import { FormField } from '../FormField/FormField';

const fields = [
  ['title', 'Título'],
  ['prompt', 'Enunciado'],
  ['objective', 'Objetivo'],
  ['skill', 'Habilidade'],
  ['hint1', 'Dica 1'],
  ['hint2', 'Dica 2'],
  ['hint3', 'Dica 3'],
  ['explanation', 'Explicação'],
  ['visualLabel', 'Descrição dos objetos visuais'],
];

export function QuestionFields() {
  return (
    <>
      {fields.map(([name, label]) => (
        <FormField key={name} name={name} label={label} />
      ))}
      <VisualFields />
    </>
  );
}
