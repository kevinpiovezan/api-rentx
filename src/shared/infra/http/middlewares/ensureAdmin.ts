import { NextFunction, Request, Response } from 'express';

import { UserRepository } from '../../../../modules/accounts/infra/typeorm/repositories/implementations/UsersRepository';
import { AppError } from '../../../errors/AppError';

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const { id } = request.user;

  const usersRepository = new UserRepository();
  const user = await usersRepository.findById(id);

  if (!user.isAdmin) {
    throw new AppError('User is not a administrator');
  }
  return next();
}
