import { Request, Response, NextFunction } from 'express';

import Mailjet, { SendEmailV3_1 } from 'node-mailjet';

const mailjet = new Mailjet({
  apiKey: process.env.MAILJET_PUBLIC_KEY,
  apiSecret: process.env.MAILJET_PRIVATE_KEY
});

import Organisation from '../models/organisation';

const { ErrorHandler } = require('../middlewares/errorMiddleware');
const { errors } = require('../utils/errors');

import { OrganisationResponseT, OrganisationT } from 'organisationsT';
import { UserFoundResponseT, UserT } from 'usersT';

exports.checkIfUSerIsInvited = async (
  req: Request,
  res: OrganisationResponseT,
  next: NextFunction
) => {
  try {
    const userIsInvited = await Organisation.find({
      invitedUsers: req.body.email
    });

    console.log('userIsInvited', userIsInvited);

    if (userIsInvited.length > 0)
      throw new ErrorHandler(
        errors.conflict,
        'User already invited in organisation'
      );

    next();

    next();
  } catch (error: any) {
    next(error);
  }
};

exports.sendInviteEmailToUser = async (
  req: Request,
  res: OrganisationResponseT,
  next: NextFunction
) => {
  try {
    const invitedFrom = res.orgFound?.orgUsers[0]?.username;

    const { email } = req.body;
    if (!email)
      throw new ErrorHandler(errors.notFound, 'No email adress provided');

    const inviteLink = `${process.env.CLIENT_URL}/organisations/${res.orgFound?.id}/join`;

    const data = {
      Messages: [
        {
          From: {
            Email: process.env.MAILJET_SENDER_EMAIL,
            Name: invitedFrom
          },
          To: [
            {
              Email: req.body.email,
              Name: 'Utilisateur'
            }
          ],
          Subject: 'Invitation à MeHouse',
          TextPart: 'Vous êtes invité !',
          HTMLPart: `<h2>${invitedFrom} vous a invité à rejoindre ${res.orgFound?.orgName} sur MeHouse.</h2><br />
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
