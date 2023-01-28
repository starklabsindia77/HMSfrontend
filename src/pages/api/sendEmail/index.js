/* eslint-disable import/no-anonymous-default-export */
import dbConnect from '../../../utils/dbConnect';
import verifyTokens from '../middlewares/verify-tokens';
// import jwt from "jsonwebtoken";

export default async (req, res) => {
  const { method } = req;
  await verifyTokens(req, res);
  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        let nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
          port: 465,
          host: 'smtp.gmail.com',
          auth: {
            user: 'starklabsindia@gmail.com',
            pass: 'Noki@lumi@52',
          },
          secure: true,
        });
        const mailData = {
          from: 'starklabsindia@gmail.com',
          to: req.body.Email,
          subject: `Message From ${req.body.Name}`,
          text: req.body.message + ' | Sent from: ' + req.body.Email,
          html: `<div>${req.body.message}</div><p>Sent from:${req.body.Email}</p>`,
        };
        transporter.sendMail(mailData, function (err, info) {
          if (err) console.log(err);
          else console.log(info);
        });
        res.status(200);

        res.status(200).send({ success: true, message: 'Email Send Sucessfully' });
      } catch (error) {
        res.status(400).send(error);
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
  //user check
};
