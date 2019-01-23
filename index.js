import app from './server/server';

const PORT = 5000;

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
