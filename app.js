import express from 'express';

const app = express();

// Index Route

app.get('/', (req, res) => {
	res.send('HOME');
});

app.get('/about', (req, res) => {
	res.send('ABOUT');
});

const port = 5000;

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
