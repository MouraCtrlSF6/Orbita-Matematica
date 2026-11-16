import { Text, View } from '@react-pdf/renderer';

interface ReportHeaderProps {
  roomName: string;
  title: string;
}

export function ReportHeader({ roomName, title }: ReportHeaderProps) {
  return (
    <View fixed style={{ position: 'absolute', top: 20, left: 51, right: 51, color: '#6A6E7B' }}>
      <Text style={{ fontSize: 9 }}>Órbita Matemática · {roomName}</Text>
      <Text style={{ fontSize: 8, marginTop: 3 }}>{title}</Text>
    </View>
  );
}
