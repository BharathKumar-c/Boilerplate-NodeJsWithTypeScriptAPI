import express, { Router } from 'express';
import { AuthController } from '../../../controllers';

const router: Router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/refreshToken', AuthController.refreshToken);

export default router;
