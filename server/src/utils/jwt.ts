import jwt from 'jsonwebtoken';
export function sign(payload: any) {
  return jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
}
export function verify(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET || 'secret');
}
