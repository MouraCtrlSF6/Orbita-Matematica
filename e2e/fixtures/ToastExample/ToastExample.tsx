import { useState } from 'react';
import { Button } from '../../../src/components/Button/Button';
import { Toast } from '../../../src/components/Toast/Toast';
import { ToastVariant } from '../../../src/components/Toast/toast-styles';

export function ToastExample() {
  const [selected, setSelected] = useState<ToastVariant | null>(null);
  const [temporaryOpen, setTemporaryOpen] = useState(false);
  const [actionCount, setActionCount] = useState(0);

  return (
    <section aria-label="Demonstração de notificações" className="my-6 grid gap-3">
      <h2>Toast</h2>
      <p>Pressione F8 para acessar as notificações.</p>
      <div className="flex flex-wrap gap-3">
        {Object.values(ToastVariant).map((variant) => (
          <Button key={variant} onClick={() => setSelected(variant)}>
            Mostrar {variant}
          </Button>
        ))}
        <Button onClick={() => setTemporaryOpen(true)}>Mostrar notificação temporária</Button>
      </div>
      <output aria-label="Ações executadas">{actionCount}</output>
      {Object.values(ToastVariant).map((variant) => (
        <Toast
          key={variant}
          title={`Notificação ${variant}`}
          description="Acompanhe o resultado da sua ação e continue a exploração com tranquilidade."
          variant={variant}
          open={selected === variant}
          onOpenChange={(open) => {
            if (!open) setSelected((current) => (current === variant ? null : current));
          }}
          action={{
            label: 'Repetir ação',
            altText: 'Você também pode repetir a ação pelo formulário.',
            onClick: () => setActionCount((current) => current + 1),
          }}
        />
      ))}
      <Toast
        title="Notificação temporária"
        description="Esta mensagem fecha automaticamente."
        open={temporaryOpen}
        onOpenChange={setTemporaryOpen}
        duration={450}
      />
    </section>
  );
}
