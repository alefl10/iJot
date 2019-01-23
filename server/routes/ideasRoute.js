import express from 'express';
import controller from '../controllers/ideasController';

const router = express.Router();

router.route('/')
	.get(controller.get)
	.post(controller.post);

router.get('/add', (req, res) => {
	res.render('ideas/add');
});

router.get('/edit/:id', controller.getOne);

// Edit Form process
router.route('/:id')
	.put(controller.put)
	.delete(controller.delete);

export default router;
