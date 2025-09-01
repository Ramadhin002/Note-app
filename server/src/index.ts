import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from "./routes/auth.routes.ts";
import notesRoutes from "./routes/notes.routes.ts";
import  morgan from 'morgan';

dotenv.config();
const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(',') || '*' }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => res.json({ ok: true, service: 'note-app-server' }));
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/noteapp').then(()=>{
  app.listen(PORT, ()=> console.log('Server running on', PORT));
}).catch(err=> {
  console.error(err);
  process.exit(1);
});
