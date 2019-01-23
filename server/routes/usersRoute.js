import express from 'express';
import controller from '../controllers/usersController';

const router = express.Router();

// User Login Route
router.get('/login', controller.getLogin);

// User Register Route
router.get('/register', controller.getRegister);

export default router;
