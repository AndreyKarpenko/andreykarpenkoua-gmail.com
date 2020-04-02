import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import {UserController, DialogController} from './controllers';

const app = express();
const User = new UserController();
const Dialog = new DialogController();

mongoose.connect('mongodb://localhost:27017/chat', {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/register', User.register);

app.get('/user/:id', User.findById);
app.delete('/user/:id', User.removeUser);

app.post('/dialog', Dialog.create);
app.get('/dialog/:id', Dialog.findById);
app.get('/dialogs', Dialog.getAll);

app.listen(3000, () => {
    console.log('Server has started');
});