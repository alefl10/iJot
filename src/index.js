import app from './server/server';
import { db } from './config/database';

const PORT = process.env.PORT || db.PORT;

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
