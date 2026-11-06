import { SelectField } from '../../SelectField/SelectField';

const values = [2, 3, 4].map((value) => ({ value: String(value), label: String(value) }));

export function CreationFields() {
  return (
    <>
      <p>Criação guiada: 2 × x + 4. O aluno escolhe cristais ou peças e x entre 2, 3 e 4.</p>
      <SelectField label="Valor inicial de x" name="variable" defaultValue="2" options={values} />
    </>
  );
}
