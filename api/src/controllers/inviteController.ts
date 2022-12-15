import { Request, Response, NextFunction } from 'express';

import Mailjet, { SendEmailV3_1 } from 'node-mailjet';

const mailjet = new Mailjet({
  apiKey: process.env.MAILJET_PUBLIC_KEY,
  apiSecret: process.env.MAILJET_PRIVATE_KEY
});

const { ErrorHandler } = require('../middlewares/errorMiddleware');
const { errors } = require('../utils/errors');

import { OrganisationResponseT, OrganisationT } from 'organisationsT';
import { UserFoundRequestT, UserT, UserFoundResponseT } from 'usersT';

// TODO
// Get admin's username
exports.sendInviteEmailToUser = async (
  req: UserFoundRequestT,
  res: OrganisationResponseT,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    if (!email)
      throw new ErrorHandler(errors.notFound, 'No email adress provided');

    if (res.orgFound?.invitedUsers?.includes(email))
      throw new ErrorHandler(
        errors.notFound,
        'User already invited to organisation'
      );

    const orgName: string = res.orgFound?.orgName;
    const inviteLink = `${process.env.API_URL}/organisations/${res.orgFound?.id}/join/${email}`;

    const data = {
      Messages: [
        {
          From: {
            Email: process.env.MAILJET_SENDER_EMAIL,
            Name: `${orgName} admin`
          },
          To: [
            {
              Email: email,
              Name: 'Utilisateur'
            }
          ],
          Subject: 'Invitation à MeHouse',
          TextPart: 'Vous êtes invité !',
          HTMLPart: `<h2>${orgName} admin vous a invité à rejoindre ${orgName} sur MeHouse.</h2><br />
        Cliquez sur ce lien pour rejoindre le groupe :
        <br />
        <br />
        <a href='${inviteLink}'>Rejoindre</a>
        <br />
        <br />
        À très vite !
        `,
          CustomID: 'InviteUserToOrgaEmail'
        }
      ]
    };

    const response = await mailjet
      .post('send', { version: 'v3.1' })
      .request(data);

    if (!response)
      throw new ErrorHandler(
        errors.failDependency,
        'Une erreur est survenue, merci de réitérer. Si le problème persiste, merci de nous contacter'
      );

    console.log('response from invite:', response);
    next();
  } catch (error) {
    next(error);
  }
};
