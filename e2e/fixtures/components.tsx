import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import '../../src/styles.css';
import { Button } from '../../src/components/Button/Button';
import { ButtonVariant } from '../../src/components/Button/button-styles';
import { Input } from '../../src/components/Input/Input';
import { Select } from '../../src/components/Select/Select';
import { Checkbox } from '../../src/components/Checkbox/Checkbox';
import { CheckboxVariant } from '../../src/components/Checkbox/checkbox-styles';
import { RadioGroup } from '../../src/components/RadioGroup/RadioGroup';
import { RadioGroupVariant } from '../../src/components/RadioGroup/radio-group-styles';
import { Tabs } from '../../src/components/Tabs/Tabs';
import { Dialog } from '../../src/components/Dialog/Dialog';
import { Collapsible } from '../../src/components/Collapsible/Collapsible';
import { CollapsibleVariant } from '../../src/components/Collapsible/collapsible-styles';

export function ComponentFixture() {
  const [result, setResult] = useState('');

  return (
    <main className="max-w-200 pb-8">
      <h1>Componentes compartilhados</h1>
      <form
        className="grid gap-5 mt-6"
        onSubmit={(event) => {
          event.preventDefault();
          setResult(JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))));
        }}
      >
        <label className="grid gap-1">
          Nome
          <Input name="name" required />
        </label>
        <Select
          label="Setor"
          name="sector"
          defaultValue="launch"
          options={[
            { value: 'launch', label: 'Lançamento' },
            { value: 'disabled', label: 'Indisponível', disabled: true },
            { value: 'base', label: 'Base' },
          ]}
        />
        <Checkbox label="Continuar progresso" name="resume" variant={CheckboxVariant.Card} />
        <RadioGroup
          label="Alternativas"
          name="answer"
          defaultValue="4"
          variant={RadioGroupVariant.Cards}
          options={[
            { value: '4', label: 'Quatro' },
            { value: '5', label: 'Cinco', disabled: true },
            { value: '6', label: 'Seis' },
          ]}
        />
        <Button type="submit">Salvar</Button>
      </form>
      <output aria-label="Valores salvos">{result}</output>
      <div className="my-6 flex flex-wrap gap-3">
        {Object.values(ButtonVariant).map((variant) => (
          <div
            key={variant}
            className={variant === ButtonVariant.Navigation ? 'rounded-control bg-sidebar' : ''}
          >
            <Button variant={variant}>{variant}</Button>
          </div>
        ))}
      </div>
      <Tabs
        label="Seções"
        defaultValue="students"
        items={[
          { value: 'students', label: 'Alunos', content: 'Lista de alunos' },
          { value: 'questions', label: 'Questões', content: 'Lista de questões' },
        ]}
      />
      <div className="mt-6">
        <Collapsible title="Detalhes da missão" variant={CollapsibleVariant.Card} keepMounted>
          <Collapsible title="Apoios" keepMounted>
            <Input aria-label="Anotação" />
          </Collapsible>
        </Collapsible>
        <Dialog
          title="Ajustes"
          description="Ajuste sua experiência."
          trigger={<Button>Abrir ajustes</Button>}
        >
          <Input aria-label="Apelido" />
          <Button className="mt-4">Confirmar</Button>
        </Dialog>
      </div>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<ComponentFixture />);
