const mongoose = require('mongoose')

const officeSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a office name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter a office emails'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  phoneNumber: {
    type: String,
    required: false,
    maxlength: [20, 'Phone number can not be longer than 20 characters'],
    default: '',
  },
  address: {
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  numOfRooms: {
    type: String,
    required: true,
  },
  subscription: {
    type: String,
    enum: ['Standard', 'Business', 'Elite'],
    default: 'Standard',
    required: true,
  },
  billing: {
    cardNumber: String,
    expirationDate: String,
    cvv: String,
  },
  staff: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    default: [],
    required: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

module.exports = mongoose.model('Office', officeSchema)
