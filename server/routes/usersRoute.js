import express from 'express';
import controller from '../controllers/usersController';

const router = express.Router();

// User Login Route
router.get('/login', controller.getLogin);

// User Register Route
router.route('/register')
	.get(controller.getRegister)
	.post(controller.postRegister);

export default router;
