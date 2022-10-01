import express, { Router } from 'express';
import { AuthController } from '../../../controllers';
import { verifyUser } from '../../../middleware';

const router: Router = express.Router();

router.get('/', verifyUser, AuthController.getUser);

export default router;
