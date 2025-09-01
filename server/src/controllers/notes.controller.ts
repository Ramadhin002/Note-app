import { Request, Response } from 'express';
import Note from '../models/note.model';
import { AuthedRequest } from '../utils/auth.mw';

export async function createNote(req: AuthedRequest, res: Response){
  const { title, body } = req.body;
  const n = await Note.create({ userId: req.user.id, title, body });
  res.status(201).json(n);
}
export async function listNotes(req: AuthedRequest, res: Response){
  const notes = await Note.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(500);
  res.json(notes);
}
export async function deleteNote(req: AuthedRequest, res: Response){
  const id = req.params.id;
  const note = await Note.findOneAndDelete({ _id: id, userId: req.user.id });
  if(!note) return res.status(404).json({ error: 'Not found' });
  res.status(204).end();
}
