export const initialFormValues = {
  appointmentDate: new Date(),
  appointmentType: '',
  appointmentDetails: '',
  patient: '',
}

export const appointmentTypes = [
  { label: 'well-check', value: 'well-check' },
  { label: 'sick-check', value: 'sick-check' },
  { label: 'concern-check', value: 'concern-check' },
]
