import { Router } from 'express';
import { SignupValidation, LoginValidation } from '../Middlewares/AuthValidation.js';
import { Signup, Login } from '../Controllers/AuthController.js';

const router = Router();

router.post('/login', LoginValidation, Login);

router.post('/signup', SignupValidation, Signup);

export default router;