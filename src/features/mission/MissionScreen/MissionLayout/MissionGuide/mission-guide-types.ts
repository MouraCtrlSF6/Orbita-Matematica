export interface MissionGuideProps {
  hints: string[];
  openHints: number;
  done: boolean;
  onHint: () => void;
}
