import { studentPageData } from './student-page-data';
import { Fragment } from 'react';
import { historicalPages, individualSectorPages } from './student-pages';
import type { ReportRecord, ReportSnapshot } from '../../../../game/report-types';
import { StudentOverview } from '../../StudentOverview/StudentOverview';

interface StudentPagesProps {
  snapshot: ReportSnapshot;
  studentId: string;
  records: ReportRecord[];
}

export function StudentPages({ snapshot, studentId, records }: StudentPagesProps) {
  const { current, historical, name } = studentPageData(snapshot, studentId, records);

  return (
    <Fragment>
      <StudentOverview roomName={snapshot.roomName} name={name} records={current} />
      {individualSectorPages(snapshot.roomName, name, current)}
      {historicalPages(snapshot.roomName, name, historical)}
    </Fragment>
  );
}
