import { Request, Response } from 'express';
import User from '../models/user.model';
import Otp from '../models/otp.model';
import bcrypt from 'bcryptjs';
import { sign } from '../utils/jwt';
import crypto from 'crypto';

export async function register(req: Request, res: Response){
  const { name, email, password } = req.body;
  if(!email) return res.status(400).json({ error: 'Email required' });
  const exists = await User.findOne({ email });
  if(exists) return res.status(409).json({ error: 'Email already exists' });
  const passwordHash = password ? await bcrypt.hash(password, 10) : undefined;
  const user = await User.create({ name, email, passwordHash });
  return res.status(201).json({ id: user._id });
}

export async function login(req: Request, res: Response){
  const { email, password } = req.body;
  if(!email || !password) return res.status(400).json({ error: 'Missing fields' });
  const user = await User.findOne({ email });
  if(!user || !user.passwordHash) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if(!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = sign({ id: user._id, email: user.email });
  res.json({ token });
}

// Simulated OTP send: stores OTP in DB, returns OTP in response for dev/demo purposes.
export async function sendOtp(req: Request, res: Response){
  const { email } = req.body;
  if(!email) return res.status(400).json({ error: 'Email required' });
  const otp = Math.floor(100000 + Math.random()*900000).toString();
  await Otp.create({ email, otp });
  // NOTE: In production send via email provider. For dev we return OTP to the client.
  res.json({ ok: true, otp });
}

export async function verifyOtp(req: Request, res: Response){
  const { email, otp } = req.body;
  if(!email || !otp) return res.status(400).json({ error: 'Missing fields' });
  const rec = await Otp.findOne({ email, otp });
  if(!rec) return res.status(401).json({ error: 'Invalid or expired OTP' });
  let user = await User.findOne({ email });
  if(!user) user = await User.create({ email });
  const token = sign({ id: user._id, email: user.email });
  res.json({ token });
}

// Google OAuth callback stub (passport expected in future)
export async function googleCallback(req: Request, res: Response){
  // For the assignment: we provide a stub endpoint that would accept google profile and sign token.
  const { googleId, email, name } = req.body;
  if(!googleId || !email) return res.status(400).json({ error: 'Missing google payload' });
  let user = await User.findOne({ googleId });
  if(!user) user = await User.findOne({ email });
  if(!user) user = await User.create({ googleId, email, name });
  else { if(!user.googleId) { user.googleId = googleId; await user.save(); } }
  const token = sign({ id: user._id, email: user.email });
  res.json({ token });
}
