import { StyleSheet } from '@react-pdf/renderer';

export const palette = ['#8A72B5', '#B9DECE', '#DDB094', '#E6E7ED'];
export const styles = StyleSheet.create({
  page: {
    backgroundColor: '#F7F8FA',
    color: '#26283B',
    fontFamily: 'Helvetica',
    fontSize: 11,
    padding: 51,
    paddingTop: 70,
    paddingBottom: 65,
  },
  brand: {
    position: 'absolute',
    top: 28,
    left: 51,
    height: 14,
    lineHeight: 1,
    color: '#6A6E7B',
    fontSize: 10,
  },
  title: { fontSize: 21, fontWeight: 'bold', marginBottom: 16, color: '#66577E' },
  subtitle: { fontSize: 14, fontWeight: 'bold', marginTop: 14, marginBottom: 10 },
  paragraph: { marginBottom: 8, lineHeight: 1.45 },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 51,
    right: 51,
    fontSize: 9,
    color: '#6A6E7B',
  },
  row: { flexDirection: 'row', borderBottom: '1 solid #E6E7ED', paddingVertical: 8 },
  cell: { flex: 1, paddingHorizontal: 5, fontSize: 10 },
  tableHeader: { backgroundColor: '#F1EBFB', flexDirection: 'row', paddingVertical: 8 },
  note: { color: '#6A6E7B', fontSize: 10, marginBottom: 12 },
  charts: { flexDirection: 'row', gap: 14, marginTop: 10, marginBottom: 16 },
  chart: { flex: 1 },
  legend: { fontSize: 9, marginBottom: 4 },
  block: { marginBottom: 18 },
});
