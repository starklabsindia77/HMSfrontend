/* eslint-disable import/no-anonymous-default-export */
import dbConnect from '../../../utils/dbConnect';
import Invoice from "../../../model/Invoice";
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
          // text: req.body.message + ' | Sent from: ' + req.body.Email,
          html: `<body>
          <h3>Dear Name,</h3>
          <p>Congratulations! You have completed your booking with https://www.hms-travel.com/</p>
          <p>Click on below link to confirm the itinerary.</p>
          <p>Xyz .com</p>
          <p>Your Booking ID: </p>
          <p>For latest updates related to COVID-19 please visit https://www.hms-travel.com/</p>
        </body>`,
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
