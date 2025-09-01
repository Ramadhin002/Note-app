import { Router } from 'express';

import { googleCallback, login, register, sendOtp, verifyOtp } from '../controllers/auth.controller';


const r = Router();
r.post('/register',register );
r.post('/login', login);
r.post('/otp/send', sendOtp);
r.post('/otp/verify', verifyOtp);
r.post('/google/callback', googleCallback); // stub for google login
export default r;
