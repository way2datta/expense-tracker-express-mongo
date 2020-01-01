
import express from 'express';
import servicesRoutes from './routes/services';
import DatabaseInitializer from './database/DatabaseInitializer';

const cors = require('cors');

const app = express();
const whitelist = uiAppUrls;
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));
(new DatabaseInitializer()).initialize();

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/', servicesRoutes);

app.all('/server.*', (request, response) => {
  response.status(403).send({
    message: 'Access Forbidden',
  });
});
app.use(express.static('dist'));

const AnyUrl = '*';
const path = require('path');
const { uiAppUrls } = require('./config');
const errorHandler = require('./ErrorHandler');

app.get(AnyUrl, (request, response) => {
  response.sendFile('index.html', { root: path.join('dist') });
});

app.use(errorHandler);

export default app;
