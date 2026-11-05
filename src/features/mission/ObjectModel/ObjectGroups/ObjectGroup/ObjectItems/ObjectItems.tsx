export interface ObjectItemsProps {
  count: number;
}

export function ObjectItems({ count }: ObjectItemsProps) {
  return (
    <>
      {Array.from({ length: count }, (_, item) => (
        <i key={item}>◆</i>
      ))}
    </>
  );
}
