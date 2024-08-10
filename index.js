import express from 'express';
import cors from 'cors';

import videoRouter from './routes/videoRoutes.js';

const app = express();

app.use(cors());

app.get('/test', (req, res) => {
  res.send('Hello world');
});

app.use('/api/v1/video', videoRouter);

app.listen(3000, () => {
  console.log('server is listening on port 3000');
});
