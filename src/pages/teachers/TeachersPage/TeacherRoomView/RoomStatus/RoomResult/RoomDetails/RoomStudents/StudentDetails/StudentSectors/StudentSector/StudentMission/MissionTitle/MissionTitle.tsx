interface MissionTitleProps {
  title?: string;
}

export function MissionTitle({ title }: MissionTitleProps) {
  return title ? <p>{title}</p> : null;
}
