import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

// Match user entered password to hashed password in database
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//@desc hash password pre 'findOneAndUpdate'
// userSchema.pre('findOneAndUpdate', async function (next) {
//   if (this._update.password) {
//     const salt = await bcrypt.genSalt(10);
//     this._update.password = await bcrypt.hash(this._update.password, salt);
//   }
// })

//Export the model
const User = mongoose.model('User', userSchema);
export default User;