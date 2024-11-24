

import { sendConfirmationEmail } from "../../../../infrastructure/service/NodeMailer";
export default class SendConfirmationEmailUseCase {

  async execute(userId: string, email: string, name: string) {
    await sendConfirmationEmail(userId, email, name);
  }
}