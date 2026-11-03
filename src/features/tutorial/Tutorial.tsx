import { useEffect, useRef, useState } from 'react';
import { Icon } from '../../components/Icon';
import { IconName } from '../../components/icon-names';
import { ObjectModel } from '../mission/ObjectModel';
import { SpaceFlight } from '../map/SpaceFlight';
import { createWorld } from '../../game/space';

const practiceWorld = createWorld([{ id: 'beacon', label: 'Sinal de treinamento' }]);

interface TutorialProps {
  onFinish: () => void;
  onBack: () => void;
  reducedMotion?: boolean;
  soundEnabled?: boolean;
  paused?: boolean;
}
export function Tutorial({
  onFinish,
  onBack,
  reducedMotion = false,
  soundEnabled = true,
  paused = false,
}: TutorialProps) {
  const [step, setStep] = useState(-1);
  const [answer, setAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (step >= 0) cardRef.current?.focus();
  }, [step]);
  return (
    <section className="tutorial-screen">
      <button className="text-button back-link" onClick={onBack}>
        <Icon name={IconName.Back} size={18} />
        Voltar ao mapa
      </button>
      <p className="eyebrow">ANTES DE DECOLAR · PASSO {step + 2} DE 4</p>
      <h1>{step === -1 ? 'Seu primeiro voo.' : 'Seu primeiro contato com a álgebra.'}</h1>
      {step === -1 ? (
        <div className="tutorial-pilot">
          <p>
            No universo, visite os setores. Dentro de cada setor, encontre planetas, luas e
            asteroides com desafios. Conclua uma missão para liberar a próxima.
          </p>
          <p>
            Experimente voar até o sinal e confirme a entrada. Você também pode usar os botões de
            direção ou pular esta prática; nos mapas, “Destinos em lista” permite visitar sem
            pilotar.
          </p>
          <SpaceFlight
            world={practiceWorld}
            statuses={{
              beacon: {
                unlocked: true,
                completed: false,
                detail: 'Aproxime-se e confirme a entrada para concluir a prática',
              },
            }}
            nextId="beacon"
            initialPosition={{ x: 260, y: 470 }}
            reducedMotion={reducedMotion}
            soundEnabled={soundEnabled}
            paused={paused}
            onVisit={() => setStep(0)}
          />
          <div className="button-row">
            <button className="button primary" onClick={() => setStep(0)}>
              Pular prática de pilotagem
            </button>
          </div>
        </div>
      ) : null}
      {step >= 0 ? (
        <div className="tutorial-card" key={step} ref={cardRef} tabIndex={-1}>
          <div className="guide-avatar" aria-hidden="true">
            ✦
          </div>
          {step === 0 ? (
            <>
              <h2>Oi! Eu sou a Luma.</h2>
              <p>
                Vou acompanhar você nesta expedição. Cada missão tem um desafio curto e você pode
                pedir ajuda quando quiser.
              </p>
              <ul className="tutorial-benefits">
                <li>◉ Ouça o enunciado, se houver uma voz disponível.</li>
                <li>◇ Veja as quantidades com objetos.</li>
                <li>✦ Abra pistas, uma de cada vez.</li>
              </ul>
              <button className="button primary" onClick={() => setStep(1)}>
                Conhecer uma variável
                <Icon name={IconName.Arrow} size={18} />
              </button>
            </>
          ) : null}
          {step === 1 ? (
            <>
              <h2>Uma letra pode representar uma quantidade.</h2>
              <p>
                Cada robô precisa de 2 cristais. Chamamos a quantidade de robôs de{' '}
                <strong>x</strong>. O total de cristais é <strong>2 × x</strong>.
              </p>
              <ObjectModel model={{ groups: 3, perGroup: 2, extra: 0, label: 'cristais' }} />
              <p>
                Para 3 robôs, x = 3. Trocamos a letra pelo número: <strong>2 × 3 = 6</strong>.
              </p>
              <button className="button primary" onClick={() => setStep(2)}>
                Agora é sua vez
                <Icon name={IconName.Arrow} size={18} />
              </button>
            </>
          ) : null}
          {step === 2 ? (
            <>
              <h2>Vamos experimentar?</h2>
              <p>Agora temos 2 robôs: x = 2. Se cada um usa 2 cristais, quanto vale 2 × x?</p>
              <fieldset className="tutorial-choices">
                <legend>Escolha o total de cristais</legend>
                {['2', '4', '6'].map((value) => (
                  <label
                    className={`answer-option ${answer === value ? 'selected' : ''}`}
                    key={value}
                  >
                    <input
                      type="radio"
                      name="tutorial-answer"
                      value={value}
                      checked={answer === value}
                      onChange={() => {
                        setAnswer(value);
                        setChecked(true);
                      }}
                    />
                    {value} cristais
                  </label>
                ))}
              </fieldset>
              <div role="status">
                {checked ? (
                  answer === '4' ? (
                    <p className="tutorial-success">
                      Isso! 2 × 2 = 4. Você já fez sua primeira substituição.
                    </p>
                  ) : (
                    <p>São 2 grupos de 2: 2 + 2 = 4. Tente escolher esse total.</p>
                  )
                ) : null}
              </div>
              <button className="button primary" disabled={answer !== '4'} onClick={onFinish}>
                Pronto para explorar
                <Icon name={IconName.Rocket} size={18} />
              </button>
            </>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
