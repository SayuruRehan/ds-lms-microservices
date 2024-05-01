import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import { hashPassword } from '../utils/hash.util.js'

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required.']
  },
  email: {
    type: String,
    required: [true, 'Email field is required.'],
    unique: [true, 'Email already exists.']
  },
  NIC: {
    type: String,
    required: [true, 'NIC field is required.'],
    unique: [true, 'NIC already exists.']
  },
  password: {
    type: String,
    required: [true, 'Password field is required.']
  },
  role: {
    type: String,
    enum: {
      values: ['learner', 'instructor', 'admin'],
      message: 'Invalid role type.'
    },
    default: 'learner'
  }
})

userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await hashPassword(user.password)
  }
  next()
})

userSchema.methods.checkPassword = async function (password) {
  const user = this
  return bcrypt.compare(password, user.password)
}

const User = mongoose.model('User', userSchema)

export default User