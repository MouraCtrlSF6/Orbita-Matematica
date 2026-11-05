import type {
  ProvidedAnswer,
  RoomMission,
  RoomSector,
  RoomStudent,
} from '../../game/room-progress';
import { RemoveStudentButton } from './RemoveStudentButton';

const statusLabels = {
  not_started: 'Não iniciado',
  in_progress: 'Em andamento',
  completed: 'Concluído',
};

function AttemptContext({ attempt }: { attempt: ProvidedAnswer }) {
  if (attempt.context === undefined) return null;
  return (
    <span>
      {' '}
      · {attempt.context}, x = {attempt.variable}
    </span>
  );
}

function Attempt({ attempt }: { attempt: ProvidedAnswer }) {
  return (
    <li>
      {attempt.answer.label} · {attempt.answer.value} · {attempt.correct ? 'Correta' : 'Incorreta'}
      <AttemptContext attempt={attempt} />
    </li>
  );
}

function orderedAttempts(mission: RoomMission) {
  return Object.entries(mission.providedAnswers ?? {}).sort(
    ([, left], [, right]) => left.order - right.order,
  );
}

const noAnswers = <p>Nenhuma resposta registrada nesta sala.</p>;

function MissionAnswers({ mission }: { mission: RoomMission }) {
  const attempts = orderedAttempts(mission);
  if (!attempts.length) return noAnswers;
  return (
    <ol>
      {attempts.map(([id, attempt]) => (
        <Attempt key={id} attempt={attempt} />
      ))}
    </ol>
  );
}

function MissionSupports({ mission }: { mission: RoomMission }) {
  return (
    <p>
      Dicas usadas {mission.usedHints ? 'sim' : 'não'} · Modelo visual usado{' '}
      {mission.usedVisuals ? 'sim' : 'não'}
    </p>
  );
}

function StudentMission({ mission }: { mission: RoomMission }) {
  return (
    <details>
      <summary>
        Missão {mission.missionNumber} · {statusLabels[mission.missionStatus]}
      </summary>
      <MissionSupports mission={mission} />
      <MissionAnswers mission={mission} />
    </details>
  );
}

function StudentSector({ sector }: { sector: RoomSector }) {
  return (
    <details>
      <summary>
        {sector.sectorName} · {statusLabels[sector.sectorStatus]}
      </summary>
      {Object.entries(sector.missions)
        .sort(([, left], [, right]) => left.missionNumber - right.missionNumber)
        .map(([id, mission]) => (
          <StudentMission key={id} mission={mission} />
        ))}
    </details>
  );
}

function StudentSectors({ student }: { student: RoomStudent }) {
  return Object.entries(student.sectors).map(([id, sector]) => (
    <StudentSector key={id} sector={sector} />
  ));
}

function StudentDetails({ student }: { student: RoomStudent }) {
  return (
    <details>
      <summary>{student.name}</summary>
      <RemoveStudentButton studentId={student.studentId} name={student.name} />
      <p>Setor atual · {student.currentSector ?? 'Fora dos setores'}</p>
      <StudentSectors student={student} />
    </details>
  );
}

export function RoomStudents({ students }: { students: RoomStudent[] }) {
  return (
    <section
      className="room-students [width:min(100%,_43.75rem)] text-left [overflow-wrap:anywhere] [&_details]:[margin-block:0.5rem] [&_details]:py-2 [&_details]:px-3 [&_details]:[border:1px_solid_#cbbce4] [&_details]:rounded-option [&_summary]:cursor-pointer"
      aria-label="Alunos da sala"
    >
      <p role="status">Registros de alunos: {students.length}</p>
      {students.map((student) => (
        <StudentDetails key={student.studentId} student={student} />
      ))}
    </section>
  );
}
