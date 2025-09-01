import { Router } from 'express';
import {  createNote, deleteNote, listNotes } from '../controllers/notes.controller';
import { requireAuth } from '../utils/auth.mw';
const r = Router();
r.get('/', requireAuth, listNotes);
r.post('/', requireAuth, createNote);
r.delete('/:id', requireAuth,deleteNote);
export default r;
