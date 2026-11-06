import { sectors } from '../content/sectors';
import type { RoomStudent, RoomMission } from './room-progress';
import type { ReportRecord, ReportSnapshot } from './report-types';

function record(
  student: RoomStudent,
  sectorId: string,
  id: string,
  title: string,
  historical: boolean,
): ReportRecord {
  const mission: RoomMission | undefined = student.sectors[sectorId]?.missions[id];

  return {
    studentId: student.studentId,
    studentName: student.name,
    sectorId,
    missionId: id,
    title: mission?.missionTitle ?? title,
    status: mission?.missionStatus ?? 'missing',
    hints: mission?.usedHints ?? null,
    historical,
    answers: Object.values(mission?.providedAnswers ?? {}).sort((a, b) => a.order - b.order),
  };
}

function studentRecords(snapshot: ReportSnapshot, student: RoomStudent): ReportRecord[] {
  const current = snapshot.catalog.missions.map((mission) =>
    record(student, mission.sectorId, mission.id, mission.title, false),
  );
  const ids = new Set(snapshot.catalog.missions.map((mission) => mission.id));
  const historical = sectors.flatMap((sector) =>
    Object.entries(student.sectors[sector.id]?.missions ?? {})
      .filter(([id]) => !ids.has(id))
      .map(([id, mission]) =>
        record(student, sector.id, id, `Questão ${mission.missionNumber}`, true),
      ),
  );

  return [...current, ...historical];
}

export function reportRecords(snapshot: ReportSnapshot): ReportRecord[] {
  return snapshot.students.flatMap((student) => studentRecords(snapshot, student));
}
