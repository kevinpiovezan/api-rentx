import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RefreshTokenUseCase } from './RefreshTokenUseCase';

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);
    const token =
      request.body.token ||
      (request.headers['x-access-token'] as string) ||
      (request.query.token as string);
    const refreshToken = await refreshTokenUseCase.execute(token);
    return response.json(refreshToken);
  }
}
export { RefreshTokenController };
