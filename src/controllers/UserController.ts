import express from 'express';
import fs from 'fs';
import { UserModel } from "../schemas";

export default class UserController {
    findById(req: express.Request, res: express.Response) {
        const { id } = req.params;
        UserModel.findById(id)
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(400).send(err))
    }

    removeUser(req: express.Request, res: express.Response) {
        const { id } = req.params;
        UserModel.findByIdAndDelete(id)
            .then(() => res.status(200).send('Deleted'))
            .catch((err) => res.status(400).send(err))

    }

    register(req: express.Request, res: express.Response) {
        const {email, firstName, lastName, password} = req.body;
        let users: Array<any> = [];
        if (!email || !firstName || !lastName || !password)
            return res.status(400).send('Bad request');
        const user = new UserModel({email, firstName, lastName, password});
        fs.readFile('users.json', 'utf-8', (err, data) => {
           try{
               if(data)
                users = JSON.parse(data);
               users.push({email, firstName, lastName, password});
               fs.writeFile('users.json', JSON.stringify(users), 'utf8', () => console.log('file was written'));
           } catch (e) {
               console.log(err)
           }
        });

        user.save()
            .then((data) => res.status(200).json(data))
            .catch((err) => {
                if (err.code === 11000)
                    return res.status(400).send(err);
                res.status(400).send(err._message);
            })
    }
}