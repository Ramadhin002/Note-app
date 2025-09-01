import mongoose from 'mongoose';
const noteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: String,
  body: String
}, { timestamps: true });
export default mongoose.model('Note', noteSchema);
