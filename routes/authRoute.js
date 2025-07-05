import express from 'express';
import { registerController, loginController } from '../controllers/authController.js';

//router object
const router = express.Router();

//routing
//Register || post method
router.post('/register', registerController);

//Login || Post method
router.post('/login', loginController);


export default router;