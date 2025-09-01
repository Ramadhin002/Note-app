import React, { useEffect, useState } from 'react';
import api from '../api';
export default function Dashboard({ token }: any){
  const [notes, setNotes] = useState<any[]>([]);
  const [title, setTitle] = useState(''); const [body, setBody] = useState(''); const [error, setError] = useState('');
  useEffect(()=>{ if(token) load(); }, [token]);
  async function load(){ try{ const { data } = await api.get('/api/notes', { headers: { Authorization: `Bearer ${token}` } }); setNotes(data); }catch(e:any){ setError('Please login'); } }
  async function add(){ try{ await api.post('/api/notes', { title, body }, { headers: { Authorization: `Bearer ${token}` } }); setTitle(''); setBody(''); load(); }catch(e:any){ setError(e.response?.data?.error || 'Failed'); } }
  async function del(id:string){ try{ await api.delete('/api/notes/'+id, { headers: { Authorization: `Bearer ${token}` } }); load(); }catch(e:any){ setError('Failed'); } }
  return (<div><h2>Your Notes</h2>{error && <p style={{color:'crimson'}}>{error}</p>}<div><input placeholder='Title' value={title} onChange={e=>setTitle(e.target.value)}/><textarea placeholder='Body' value={body} onChange={e=>setBody(e.target.value)}></textarea><button onClick={add}>Create</button></div><ul>{notes.map(n=>(<li key={n._id}><strong>{n.title}</strong><p>{n.body}</p><button onClick={()=>del(n._id)}>Delete</button></li>))}</ul></div>);
}
