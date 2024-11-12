const express = require('express');
const mongoose = require('mongoose');
const professoresRouter = require('./routes/professores');

require('dotenv').config();
const db_user = process.env.db_user;
const db_key = process.env.db_key;

const app = express();
app.use(express.json());

app.use('/professores', professoresRouter);

mongoose.connect(`mongodb+srv://${db_user}:${db_key}@cluster0.vi1gr.mongodb.net/`)
    .then(() => {
        app.listen(3000, () => {
            console.log('Conectado ao mongoDB');
            console.log('Servidor iniciado na porta 3000');
        })
    })
    .catch((err) => {
        console.log(err);
    });
