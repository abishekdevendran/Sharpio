import express from 'express';
import * as dotenv from 'dotenv';
import router from './routes/router';
const PORT = 3000 || process.env.PORT;
const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

