import Idea from '../models/IdeaModel';

exports.get = (req, res) => {
	Idea.find({})
		.sort({ date: 'desc' })
		.then((ideas) => {
			res.render('ideas/index', { ideas });
		})
		.catch((err) => {
			res.send(err);
		});
};

exports.getOne = (req, res) => {
	Idea.findOne({
		_id: req.params.id,
	})
		.then((idea) => {
			res.render('ideas/edit', { idea });
		})
		.catch((err) => {
			res.send(err);
			req.flash('error_msg', 'Could not retrieve ideas from Data Base.');
			res.redirect('/ideas');
		});
};

exports.post = (req, res) => {
	const errors = [];

	if (!req.body.title) {
		errors.push({ text: 'Please add a title' });
	}
	if (!req.body.details) {
		errors.push({ text: 'Please add some details' });
	}
	if (errors.length > 0) {
		res.render('ideas/add', {
			errors,
			title: req.body.title,
			details: req.body.details,
		});
	} else {
		const newIdea = {
			title: req.body.title,
			details: req.body.details,
		};

		new Idea(newIdea)
			.save()
			.then((idea) => {
				console.log(idea);
				req.flash('success_msg', 'Future idea posted!');
				res.redirect('/ideas');
			})
			.catch((err) => {
				console.log(err);
				req.flash('error_msg', 'Could not save idea to data base.\nSchema validation returned an error.');
				res.redirect('/ideas');
			});
	}
};

exports.put = (req, res) => {
	Idea.findOne({ _id: req.params.id })
		.then((idea) => {
			if (idea.title === req.body.title && idea.details === req.body.details) {
				req.flash('warning_msg', 'Nothing needs to be updated!');
				res.redirect('/ideas');
			} else {
				const updateIdea = idea;
				updateIdea.title = req.body.title;
				updateIdea.details = req.body.details;
				updateIdea.save()
					.then((updatedIdea) => {
						console.log(updatedIdea);
						req.flash('success_msg', 'Future idea updated');
						res.redirect('/ideas');
					})
					.catch((err) => {
						console.log(err);
						req.flash('error_msg', 'Could not update idea.\nFailed to save idea to Data Base.');
						res.redirect('/ideas');
					});
			}
		})
		.catch((err) => {
			console.log(err);
			req.flash('error_msg', 'Could not update idea.\nFailed to find idea in Data Base.');
			res.redirect('/ideas');
		});
};

exports.delete = (req, res) => {
	Idea.deleteOne({ _id: req.params.id })
		.then((deleted) => {
			console.log(deleted);
			req.flash('success_msg', 'Future idea deleted');
			res.redirect('/ideas');
		})
		.catch((err) => {
			console.log(err);
			req.flash('error_msg', 'Future idea could not be deleted');
			res.redirect('/ideas');
		});
};
