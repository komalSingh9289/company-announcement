
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import announcementsRouter from './routes/announcement-routes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/announcements', announcementsRouter);

app.listen(5000, ()=> console.log('Server is running on port 5000'));