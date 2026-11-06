import {
  CollapsibleTrigger,
  type CollapsibleTriggerProps,
} from '../CollapsibleTrigger/CollapsibleTrigger';

interface CollapsibleHeadingProps extends CollapsibleTriggerProps {
  heading?: 'h2' | 'h3' | 'h4';
}

export function CollapsibleHeading({ heading: Heading, ...props }: CollapsibleHeadingProps) {
  if (!Heading) return <CollapsibleTrigger {...props} />;

  return (
    <Heading className="m-0">
      <CollapsibleTrigger {...props} />
    </Heading>
  );
}
