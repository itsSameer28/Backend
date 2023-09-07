import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  sendEmail(config) {
    return this.mailerService
      .sendMail(config)
      .then((res) => {
        console.debug('\n sendEmail \n', res);
        return res;
      })
      .catch((error) => {
        console.error('\n sendEmail \n', error);
        return error;
      });
  }
}
