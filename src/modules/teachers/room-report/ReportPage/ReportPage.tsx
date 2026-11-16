import type { ReactNode } from 'react';
import { Page, Text } from '@react-pdf/renderer';
import { styles } from '../styles';
import { ReportFooter } from './ReportFooter/ReportFooter';
import { ReportHeader } from './ReportHeader/ReportHeader';

interface ReportPageProps {
  roomName: string;
  title: string;
  children: ReactNode;
}

export function ReportPage({ roomName, title, children }: ReportPageProps) {
  return (
    <Page size="A4" style={styles.page} wrap>
      <ReportHeader roomName={roomName} title={title} />
      <Text style={styles.title}>{title}</Text>
      {children}
      <ReportFooter />
    </Page>
  );
}
