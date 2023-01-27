/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import { connect } from 'mongoose';
import env from './config/env.js';
import app from './app.js';

app.listen(process.env.PORT, () => {
  connect((process.env.MONGO_DB_URL))
    .then(() => {
      console.log('Banco de Dados MongoDB conectado com sucesso!');
    })
    .catch((err) => {
      console.log(err);
    });
  console.log('running on port 4000');
});
