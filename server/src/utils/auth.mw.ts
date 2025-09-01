import { Request, Response, NextFunction } from 'express';
import { verify } from '../utils/jwt';
export interface AuthedRequest extends Request {
  headers: any; user?: any 
}
export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction){
  const token = req.headers.authorization?.split(' ')[1];
  if(!token) return res.status(401).json({ error: 'Missing token' });
  try{
    const payload: any = verify(token as string);
    req.user = payload; next();
  }catch(e){
    return res.status(401).json({ error: 'Invalid token' });
  }
}
