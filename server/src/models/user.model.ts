import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true, index: true },
  googleId: String,
  passwordHash: String
}, { timestamps: true });
export default mongoose.model('User', userSchema);
