import React, { useState } from 'react';
import api from '../api';
export default function Login({ onLogin }: any){
  const [step, setStep] = useState<'choose'|'send'|'verify'|'pwd'>('choose');
  const [email, setEmail] = useState('demo@note.app');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('Demo@1234');
  const [error, setError] = useState('');

  async function sendOtp(){
    setError('');
    try{ const { data } = await api.post('/api/auth/otp/send', { email }); console.log('DEV OTP:', data.otp); setStep('verify'); }
    catch(e:any){ setError(e.response?.data?.error || 'Failed to send'); }
  }
  async function verifyOtp(){ try{ const { data } = await api.post('/api/auth/otp/verify', { email, otp }); onLogin(data.token); }catch(e:any){ setError(e.response?.data?.error || 'Invalid OTP'); } }
  async function loginPwd(){ try{ const { data } = await api.post('/api/auth/login', { email, password }); onLogin(data.token); }catch(e:any){ setError(e.response?.data?.error || 'Login failed'); } }

  return (<div>
    <h2>Login / Signup</h2>
    {error && <p style={{color:'crimson'}}>{error}</p>}
    {step==='choose' && (<div><input placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)}/><div><button onClick={()=>setStep('send')}>Sign in with OTP</button><button onClick={()=>setStep('pwd')}>Sign in with password</button></div></div>)}
    {step==='send' && (<div><p>Send OTP to <strong>{email}</strong></p><button onClick={sendOtp}>Send OTP</button></div>)}
    {step==='verify' && (<div><input placeholder='OTP' value={otp} onChange={e=>setOtp(e.target.value)}/><button onClick={verifyOtp}>Verify OTP</button></div>)}
    {step==='pwd' && (<div><input placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)}/><input placeholder='Password' type='password' value={password} onChange={e=>setPassword(e.target.value)}/><button onClick={loginPwd}>Login</button></div>)}
    <hr/>
    <p>Google Sign-in (demo): the client can call <code>/api/auth/google/callback</code> with googleId,email,name to get a token (for assignment demo).</p>
  </div>);
}
