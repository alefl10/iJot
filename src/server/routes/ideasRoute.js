import express from 'express';
import controller from '../controllers/ideasController';
import { ensureAuthenticated } from '../../helpers/auth';

const router = express.Router();

router.route('/')
	.get(ensureAuthenticated, controller.get)
	.post(ensureAuthenticated, controller.post);

router.get('/add', ensureAuthenticated, (req, res) => {
	res.render('ideas/add');
});

router.get('/edit/:id', ensureAuthenticated, controller.getOne);

// Edit Form process
router.route('/:id')
	.put(ensureAuthenticated, controller.put)
	.delete(ensureAuthenticated, controller.delete);

export default router;
