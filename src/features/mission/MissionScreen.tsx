import { Icon } from '../../components/Icon';
import { IconName } from '../../components/icon-names';
import { missions } from '../../content/missions';
import { sectors } from '../../content/sectors';
import { ChallengeKind, type Mission, type MissionResult } from '../../game/types';
import { AnswerInput } from './AnswerInput';
import { CreationFields } from './CreationFields';
import { ObjectModel } from './ObjectModel';
import { useMission } from './useMission';
import { MissionGuide } from './MissionGuide';

interface MissionScreenProps {
  mission: Mission;
  onComplete: (result: MissionResult) => void;
  onNext: () => void;
  onBack: () => void;
}

export function MissionScreen({ mission, onComplete, onNext, onBack }: MissionScreenProps) {
  const {
    answer,
    hints,
    visual,
    feedback,
    done,
    context,
    variable,
    creation,
    expected,
    feedbackRef,
    narration,
    complete,
    checkAnswer,
    changeAnswer,
    changeContext,
    changeVariable,
    toggleVisual,
    requestHint,
    toggleNarration,
  } = useMission(mission, onComplete);
  const sector = sectors.find((item) => item.id === mission.sectorId)!;
  const sectorMissions = missions.filter((item) => item.sectorId === mission.sectorId);
  const missionNumber = sectorMissions.findIndex((item) => item.id === mission.id) + 1;

  return (
    <div className="mission-screen">
      <button className="text-button back-link" onClick={onBack}>
        <Icon name={IconName.Back} size={18} />
        Voltar ao setor
      </button>
      <div className="mission-heading">
        <div>
          <p className="eyebrow">
            SETOR {sector.number} · {sector.name.toUpperCase()}
          </p>
          <h1>{mission.title}</h1>
        </div>
        <span className="mission-counter">
          Missão {missionNumber} <span>de {sectorMissions.length}</span>
        </span>
      </div>
      <progress
        className="mission-progress"
        value={missionNumber - (done ? 0 : 1)}
        max={sectorMissions.length}
        aria-label="Progresso no setor"
      />
      <div className="mission-layout">
        <section className="challenge-card" aria-labelledby="challenge-heading">
          <div className="challenge-top">
            <span className="small-tag">{mission.objective}</span>
            <span className="small-star">
              <Icon name={IconName.Star} size={20} />
            </span>
          </div>
          <h2 id="challenge-heading">{mission.prompt}</h2>
          {mission.kind !== ChallengeKind.Build && !creation ? (
            <div className="formula" aria-label={`Expressão: ${mission.formula}`}>
              {mission.formula}
            </div>
          ) : null}
          <div className="support-actions">
            <button className="subtle-button" onClick={toggleNarration}>
              <Icon name={IconName.Sound} size={18} />
              {narration.speaking ? 'Parar leitura' : 'Ouvir enunciado'}
            </button>
            <button className="subtle-button" aria-expanded={visual} onClick={toggleVisual}>
              <span aria-hidden="true">◇</span>
              {visual ? 'Ocultar objetos' : 'Ver com objetos'}
            </button>
          </div>
          <p className="narration-status" role="status">
            {narration.message}
          </p>
          {visual ? (
            <ObjectModel
              model={
                creation
                  ? { groups: variable, perGroup: 2, extra: 4, label: context }
                  : mission.visual
              }
            />
          ) : null}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (answer.trim() && !done) checkAnswer();
            }}
          >
            {creation ? (
              <CreationFields
                context={context}
                variable={variable}
                disabled={done}
                onContextChange={changeContext}
                onVariableChange={changeVariable}
              />
            ) : null}
            <AnswerInput
              mission={mission}
              answer={answer}
              onChange={changeAnswer}
              disabled={done}
            />
            {!done ? (
              <button
                type="submit"
                className="button primary answer-submit"
                disabled={!answer.trim()}
              >
                Conferir resposta
                <Icon name={IconName.Arrow} size={18} />
              </button>
            ) : null}
          </form>
          <div
            ref={feedbackRef}
            tabIndex={-1}
            className={feedback ? `feedback ${done ? 'success' : 'retry'}` : ''}
            role="status"
          >
            {feedback ? (
              <>
                <strong>{feedback}</strong>
                {done ? (
                  <>
                    <p>{mission.explanation}</p>
                    {creation ? (
                      <p>
                        Seu resultado: 2 × {variable} + 4 = {expected} {context}.
                      </p>
                    ) : null}
                    <button className="button primary" onClick={onNext}>
                      Continuar exploração
                      <Icon name={IconName.Arrow} size={18} />
                    </button>
                  </>
                ) : null}
              </>
            ) : null}
          </div>
        </section>
        <MissionGuide
          hints={mission.hints}
          openHints={hints}
          done={done}
          solution={
            creation ? `2 × ${variable} + 4 = ${expected} ${context}.` : mission.explanation
          }
          onHint={requestHint}
          onGuidedComplete={() => complete(true)}
        />
      </div>
    </div>
  );
}
