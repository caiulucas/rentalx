import { Router } from 'express';

import { AuthenticateUserController } from '../modules/accounts/useCases/authenticateUser/AuthenticateUserController';

export const authenticationRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
authenticationRoutes.post('/sessions', authenticateUserController.handle);
