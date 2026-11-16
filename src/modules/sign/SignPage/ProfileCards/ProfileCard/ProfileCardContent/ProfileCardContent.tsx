export interface ProfileCardContentProps {
  id: string;
  title: string;
  description: string;
}

export function ProfileCardContent({ id, title, description }: ProfileCardContentProps) {
  return (
    <span className="grid content-start gap-3 ds-down-mobile:gap-2">
      <span
        id={id}
        className="font-heading text-heading font-extrabold leading-[1.3] tracking-[-0.035em]"
      >
        {title}
      </span>
      <span id={`${id}-description`} className="text-body leading-normal text-muted">
        {description}
      </span>
    </span>
  );
}
