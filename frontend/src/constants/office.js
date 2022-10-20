export const initialFormState = {
  name: '',
  email: '',
  phoneNumber: '',
  address: {
    formattedAddress: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  },
  numOfRooms: '',
  subscription: '',
  billing: {
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  },
  staff: [],
  owner: '',
}

export const subscriptionLevels = [
  { value: 'Standard', label: 'Standard' },
  { value: 'Business', label: 'Business' },
  { value: 'Elite', label: 'Elite' },
]
