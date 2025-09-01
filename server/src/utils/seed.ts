import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user.model';
import Note from '../models/note.model';
import bcrypt from 'bcryptjs';

dotenv.config();
async function run(){
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/noteapp');
  await User.deleteMany({});
  await Note.deleteMany({});
  const user = await User.create({ name: 'Demo', email: 'demo@note.app', passwordHash: await bcrypt.hash('Demo@1234', 10) });
  await Note.create({ userId: user._id, title: 'Welcome', body: 'This is your first note.' });
  console.log('Seed done. Demo user: demo@note.app / Demo@1234');
  process.exit(0);
}
run();
