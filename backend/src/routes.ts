import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OphanagesController from './controllers/OrphanagesController';
import UsersController from './controllers/UsersController';

const routes = Router();
const upload = multer(uploadConfig);

//ORPHANAGES
routes.get('/orphanages', OphanagesController.index);
routes.get('/orphanages/:id', OphanagesController.show);
routes.post('/orphanages', upload.array('images'), OphanagesController.create);

// USERS
routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.show);
routes.post('/users', UsersController.create);

// AUTHENTICATION

export default routes;