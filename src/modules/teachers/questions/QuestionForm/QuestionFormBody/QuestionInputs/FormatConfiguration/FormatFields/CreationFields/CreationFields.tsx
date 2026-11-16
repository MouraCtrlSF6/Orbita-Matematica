import { SelectField } from '../../../SelectField/SelectField';
import { CreationExample } from './CreationExample/CreationExample';

const values = [2, 3, 4].map((value) => ({ value: String(value), label: String(value) }));

export function CreationFields() {
  return (
    <div className="grid gap-4">
      <p className="p-4 bg-selected text-primary rounded-card font-bold text-formula m-0">
        Expressão fixa: 2 × x + 4
      </p>
      <SelectField
        label="Valor inicial de x"
        name="variable"
        defaultValue="3"
        options={values}
        required
      />
      <p className="text-small text-muted m-0">O aluno poderá escolher 2, 3 ou 4.</p>
      <CreationExample />
    </div>
  );
}
