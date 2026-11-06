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
import { Tooltip } from '../../src/components/Tooltip/Tooltip';
import { TooltipVariant } from '../../src/components/Tooltip/tooltip-styles';
import { Collapsible } from '../../src/components/Collapsible/Collapsible';
import { CollapsibleVariant } from '../../src/components/Collapsible/collapsible-styles';
import { Accordion } from '../../src/components/Accordion/Accordion';
import { AccordionVariant } from '../../src/components/Accordion/accordion-styles';

export function ComponentFixture() {
  const [result, setResult] = useState('');
  const [tooltipContainer, setTooltipContainer] = useState<HTMLElement | null>(null);

  return (
    <main ref={setTooltipContainer} className="max-w-200 pb-8">
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
      <div className="my-4 flex flex-wrap gap-3">
        {Object.values(TooltipVariant).map((variant) => (
          <Tooltip
            key={variant}
            variant={variant}
            content={`Ajuda da missão ${variant}`}
            portalContainer={tooltipContainer}
          >
            <Button>Ajuda {variant}</Button>
          </Tooltip>
        ))}
      </div>
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
      <section aria-label="Demonstração de accordions" className="mt-6 grid gap-4">
        <h2>Accordion</h2>
        {Object.values(AccordionVariant).map((variant) => (
          <Accordion
            key={variant}
            label={`Accordion ${variant}`}
            type="single"
            collapsible
            variant={variant}
            items={[
              { value: 'mission', title: `Missão ${variant}`, content: 'Enunciado da missão.' },
              {
                value: 'disabled',
                title: `Indisponível ${variant}`,
                content: 'Conteúdo bloqueado.',
                disabled: true,
              },
              { value: 'support', title: `Apoios ${variant}`, content: 'Dicas da missão.' },
            ]}
          />
        ))}
        <Accordion
          label="Seções combinadas"
          type="multiple"
          items={[
            {
              value: 'notes',
              title: 'Anotações da expedição',
              content: <Input aria-label="Anotações da expedição" />,
              keepMounted: true,
            },
            {
              value: 'progress',
              title: 'Progresso da expedição',
              content: <p>Descobertas registradas.</p>,
            },
          ]}
        />
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<ComponentFixture />);
