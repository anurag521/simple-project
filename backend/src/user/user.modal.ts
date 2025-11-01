
import { Schema, model, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { Address, User } from './user.type.js';

const addressSchema = new Schema<Address>({
  street: String,
  city: String,
  state: String,
  zipCode: String,
  country: String
});

const userSchema = new Schema<User>({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  isAdmin: {
    type: Boolean,
    default: false,
    index: true
  },
  phone: {
    type: String,
    default: null
  },
  collegeName: {
    type: String,
    default: null
  },
  collegeAddress: {
    type: addressSchema,
    default: null
  },
  address: {
    type: addressSchema,
    default: null
  }
}, { 
  timestamps: true, 
  strict: false, 
  collection: 'user' 
});


userSchema.plugin(mongoosePaginate);

// Create the model with proper typing
const Users = model<User, PaginateModel<User>>('user', userSchema);

export default Users;