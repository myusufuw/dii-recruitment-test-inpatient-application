const names = [
  'Jack',
  'John',
  'Jane',
  'Mary',
  'Peter',
  'Paul',
  'George',
  'Ringo'
]

export const patientListDummy = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: names[i % names.length],
  nik: '123456789012',
  diagnosis: 'Demam',
  date: '2022-01-01',
  doctor: 'Dr. Smith',
  room: `Room ${i + 1}`
}))
