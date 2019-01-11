import express from 'express';
import hb from 'express-handlebars';

const app = express();

// Handlebars Middleware
app.engine('handlebars', hb({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Index Route
app.get('/', (req, res) => {
	const title = 'Welcome Alejandro';
	res.render('index', {
		title,
	});
});

// About route
app.get('/about', (req, res) => {
	res.render('about');
});

const port = 5000;

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
