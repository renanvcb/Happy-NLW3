import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import * as bcrypt from 'bcrypt';

import userView from '../views/users_view';
import User from '../models/User';

export default {
  async index(req: Request, res: Response) {
    const usersRepository = getRepository(User);

    const users = await usersRepository.find();
    // const users = await usersRepository.find({
    //   relations: ['orphanages']
    // });

    return res.json(userView.renderMany(users));
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOneOrFail(id);

    return res.json(userView.render(user));
  },
  
  async create(req: Request, res: Response) {
    const {
      name,
      email,
      password
    } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const usersRepository = getRepository(User);

    const data = {
      name,
      email,
      password: hashPassword,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const user = usersRepository.create(data);

    await usersRepository.save(user);

    // bcrypt.compare('ffffadsd', hashPassword, function (err, result) {
    //   console.log(result);
    // });

    res.status(201).json(user);

  }
}