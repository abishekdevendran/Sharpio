import * as dotenv from 'dotenv';
import app from './setup';
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
