import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendForgotPasswordEmailUseCase } from './SendForgotPasswordEmailUseCase';

class SendForgotPasswordEmailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const sendForgotPasswordEmailUseCase = container.resolve(
      SendForgotPasswordEmailUseCase
    );
    const { email } = request.body;
    await sendForgotPasswordEmailUseCase.execute(email);
    return response.status(201).send();
  }
}
export { SendForgotPasswordEmailController };
