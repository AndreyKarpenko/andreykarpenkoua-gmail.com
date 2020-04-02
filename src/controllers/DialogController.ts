import express from 'express';
import { DialogModel } from "../schemas";

export default class UserController {
    create(req: express.Request, res: express.Response) {
        const {partner, author} = req.body;
        const dialog = new DialogModel({partner, author});
        dialog.save()
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(400).send(err))
    }
    findById(req: express.Request, res: express.Response) {
        const { id } = req.params;
        DialogModel.find({author: id})
            .populate(['author', 'partner'])
            .exec()
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(400).send(err))
    }

    getAll(req: express.Request, res: express.Response) {
        DialogModel.find()
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(400).send(err))
    }
}